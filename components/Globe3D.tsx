'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Globe3D() {
    const containerRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Scene setup
        const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.z = 3;

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Earth sphere
        const earthGeometry = new THREE.SphereGeometry(1, 64, 64);

        // Create gradient material using shader
        const earthMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                colorA: { value: new THREE.Color('#00b4a0') },
                colorB: { value: new THREE.Color('#0a0a10') },
            },
            vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        uniform float time;
        uniform vec3 colorA;
        uniform vec3 colorB;
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          vec3 color = mix(colorB, colorA, fresnel * 0.8);
          
          // Grid lines
          float latLines = sin(vUv.y * 40.0) * 0.5 + 0.5;
          float lonLines = sin(vUv.x * 80.0) * 0.5 + 0.5;
          float grid = max(
            step(0.95, latLines),
            step(0.95, lonLines)
          ) * 0.15;
          
          color += vec3(grid) * vec3(0.0, 0.8, 0.7);
          
          gl_FragColor = vec4(color, 0.9);
        }
      `,
            transparent: true,
        });

        const earth = new THREE.Mesh(earthGeometry, earthMaterial);
        scene.add(earth);

        // Atmosphere glow
        const atmosphereGeometry = new THREE.SphereGeometry(1.15, 64, 64);
        const atmosphereMaterial = new THREE.ShaderMaterial({
            uniforms: {
                glowColor: { value: new THREE.Color('#00e5c7') },
            },
            vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        uniform vec3 glowColor;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(glowColor, intensity * 0.4);
        }
      `,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
            transparent: true,
        });

        const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
        scene.add(atmosphere);

        // ISS marker (orbiting dot)
        const issGeometry = new THREE.SphereGeometry(0.03, 16, 16);
        const issMaterial = new THREE.MeshBasicMaterial({
            color: '#ff6b35',
        });
        const iss = new THREE.Mesh(issGeometry, issMaterial);
        scene.add(iss);

        // ISS orbit ring
        const orbitGeometry = new THREE.RingGeometry(1.35, 1.36, 128);
        const orbitMaterial = new THREE.MeshBasicMaterial({
            color: '#ff6b35',
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide,
        });
        const orbitRing = new THREE.Mesh(orbitGeometry, orbitMaterial);
        orbitRing.rotation.x = Math.PI / 2 - 0.4; // Tilt to match ISS inclination
        scene.add(orbitRing);

        // Animation
        let animationId: number;
        let time = 0;

        const animate = () => {
            time += 0.01;

            // Rotate Earth
            earth.rotation.y += 0.002;

            // Update shader time
            earthMaterial.uniforms.time.value = time;

            // Orbit ISS around Earth
            const issOrbitRadius = 1.35;
            const issSpeed = 0.02;
            iss.position.x = Math.cos(time * issSpeed * 10) * issOrbitRadius;
            iss.position.z = Math.sin(time * issSpeed * 10) * issOrbitRadius * Math.cos(0.4);
            iss.position.y = Math.sin(time * issSpeed * 10) * issOrbitRadius * Math.sin(0.4);

            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animate);
        };

        animate();

        // Handle resize
        const handleResize = () => {
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight;
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div ref={containerRef} className="globe-container">
            <div className="globe-overlay" />
        </div>
    );
}
