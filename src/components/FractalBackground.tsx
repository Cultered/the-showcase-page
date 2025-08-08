import { useEffect, useRef } from 'react';

const FractalBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Vertex shader source
    const vertexShaderSource = `
      attribute vec4 a_position;
      void main() {
        gl_Position = a_position;
      }
    `;

    // Fragment shader source with fractal brownian motion and mouse interaction
    const fragmentShaderSource = /*glsl*/`
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      // Improved hash function for less grid artifacts
      float hash(vec2 p) {
        p = vec2(dot(p, vec2(127.1, 311.7)),
                 dot(p, vec2(269.5, 183.3)));
        return fract(sin(p.x) * sin(p.y) * 43758.5453123);
      }

      // Smoother noise with quintic interpolation
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);

        // Quintic interpolation
        vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);

        float a = hash(i + vec2(0.0, 0.0));
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));

        return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
      }

      // Fractal Brownian Motion with offset
      float fbm(vec2 p, vec2 offset) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 1.0;
        
        for(int i = 0; i < 6; i++) {
          value += amplitude * noise(frequency * (p + offset));
          amplitude *= 0.5;
          frequency *= 2.0;
        }
        
        return value;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        uv.x *= u_resolution.x / u_resolution.y; // Correct aspect ratio

        // Mouse interaction: normalized mouse position (aspect-corrected)
        vec2 mouse = u_mouse / u_resolution;
        mouse.x *= u_resolution.x / u_resolution.y;
        mouse.y = 1.0 - mouse.y; // Flip Y for WebGL coordinates

        // Compute distance from mouse to current pixel
        float dist = distance(uv, mouse);

        // Animate the fractal
        vec2 p = uv * 3.0 + u_time * 0.1;

        // Add mouse-based distortion to the offset
        vec2 offset = vec2(sin(u_time * 0.1) * 2.0, cos(u_time * 0.15) * 1.5);
        // Stronger and wider mouse effect
        float mouseEffect = exp(-dist * 3.0) ;
        offset += (uv - mouse) * mouseEffect;

        float fbmValue = fbm(p, offset);

        // Even lighter and more saturated dark-themed colors
        vec3 color1 = vec3(0.38, 0.20, 0.55);  // Lighter, more saturated purple
        vec3 color2 = vec3(0.22, 0.40, 0.60);  // Lighter, more saturated blue
        vec3 color3 = vec3(0.22, 0.45, 0.32);  // Lighter, more saturated teal
        vec3 color4 = vec3(0.16, 0.19, 0.32);  // Lighter, more saturated near-black blue

        // Create final color using single FBM value
        vec3 finalColor = mix(color4, color1, fbmValue);
        finalColor = mix(finalColor, color2, fbmValue * 0.8);
        finalColor = mix(finalColor, color3, fbmValue * 0.6);

        // Add some brightness variation
        finalColor += 0.04 * sin(u_time + uv.x * 10.0) * cos(u_time + uv.y * 10.0);

        // Add subtle gradient
        finalColor *= 0.85 + 0.15 * uv.y;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // Compile shader function
    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      
      return shader;
    };

    // Create shaders
    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    
    if (!vertexShader || !fragmentShader) return;

    // Create program
    const program = gl.createProgram();
    if (!program) return;
    
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return;
    }

    // Get attribute and uniform locations
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse');

    // Create buffer for full-screen quad
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]), gl.STATIC_DRAW);

    // Resize function
    const resize = () => {
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    // Mouse trail state
    let lastMouse = [0, 0];
    let mouseTrail = [0, 0];

    // Mouse event handler
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
      lastMouse = [x, y];
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Render function
    const render = (time: number) => {
      resize();

      // Smoothly interpolate mouseTrail towards lastMouse for a lasting/trailing effect
      mouseTrail[0] += (lastMouse[0] - mouseTrail[0]) * 0.08;
      mouseTrail[1] += (lastMouse[1] - mouseTrail[1]) * 0.08;
      mouseRef.current = [mouseTrail[0], mouseTrail[1]];

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);

      // Set uniforms
      gl.uniform1f(timeLocation, time * 0.001);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      // Set mouse uniform
      gl.uniform2f(mouseLocation, mouseRef.current[0], mouseRef.current[1]);

      // Set up attributes
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      
      // Draw
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationRef.current = requestAnimationFrame(render);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(render);

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default FractalBackground;