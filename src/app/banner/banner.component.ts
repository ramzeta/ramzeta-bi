import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  standalone: true,
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements AfterViewInit {

  @ViewChild('scene1', { static: false }) scene1!: ElementRef<HTMLCanvasElement>;
  @ViewChild('scene2', { static: false }) scene2!: ElementRef<HTMLCanvasElement>;
  @ViewChild('scene3', { static: false }) scene3!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    this.create3DScene(this.scene1.nativeElement, 'torus');    // Detección de objetos
    this.create3DScene(this.scene2.nativeElement, 'barChart');  // Automatización
    this.create3DScene(this.scene3.nativeElement, 'panel');     // Reconocimiento de lenguaje natural
  }

  private create3DScene(canvas: HTMLCanvasElement, shapeType: string): void {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    let object: THREE.Object3D;

    if (shapeType === 'torus') {
      // Detección de objetos: Torus Knot con MeshNormalMaterial y luces
      const geometry = new THREE.TorusKnotGeometry(5, 1.5, 100, 16);
      const material = new THREE.MeshNormalMaterial({ wireframe: false });
      object = new THREE.Mesh(geometry, material);
      scene.add(object);
      scene.add(new THREE.AmbientLight(0xffffff, 0.5));
      const pointLight = new THREE.PointLight(0xffffff, 1);
      pointLight.position.set(10, 10, 10);
      scene.add(pointLight);
    } else if (shapeType === 'barChart') {
      // Automatización: Grupo de barras dinámicas (gráfico de barras)
      const group = new THREE.Group();
      const material = new THREE.MeshBasicMaterial({ color: 0xff5733 });
      for (let i = 0; i < 5; i++) {
        const height = Math.random() * 8 + 2;
        const geometry = new THREE.BoxGeometry(2, height, 2);
        const bar = new THREE.Mesh(geometry, material);
        bar.position.x = i * 3 - 6;
        bar.position.y = height / 2 - 2; // Alinear la base
        group.add(bar);
      }
      object = group;
      scene.add(object);
    } else if (shapeType === 'panel') {
      // Reconocimiento de lenguaje natural: Panel con efecto ondulatorio
      const geometry = new THREE.PlaneGeometry(10, 5, 10, 10);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ffcc, wireframe: true, side: THREE.DoubleSide });
      object = new THREE.Mesh(geometry, material);
      scene.add(object);
    } else {
      // Fallback: Esfera
      const geometry = new THREE.SphereGeometry(7, 32, 32);
      const material = new THREE.MeshBasicMaterial({ color: 0x0077ff, wireframe: true });
      object = new THREE.Mesh(geometry, material);
      scene.add(object);
    }

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (shapeType === 'torus') {
        object.rotation.x += 0.01;
        object.rotation.y += 0.01;
      } else if (shapeType === 'barChart') {
        object.rotation.y += 0.01;
        (object as THREE.Group).children.forEach((bar, index) => {
          const scale = 1 + Math.sin(elapsed + index) * 0.2;
          bar.scale.y = scale;
          // Para acceder a la propiedad 'parameters' usamos 'any'
          const geoParams = (bar as THREE.Mesh).geometry as any;
          if (geoParams && geoParams.parameters && geoParams.parameters.height) {
            bar.position.y = (geoParams.parameters.height * scale) / 2 - 2;
          }
        });
      } else if (shapeType === 'panel') {
        object.rotation.y += 0.005;
        object.scale.x = 1 + Math.sin(elapsed) * 0.05;
        object.scale.y = 1 + Math.cos(elapsed) * 0.05;
      } else {
        object.rotation.x += 0.01;
        object.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
    };
    animate();
  }

}
