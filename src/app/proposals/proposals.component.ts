import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-proposals',
  templateUrl: './proposals.component.html',
  standalone: true,
  styleUrls: ['./proposals.component.css']
})
export class ProposalsComponent implements AfterViewInit {

  @ViewChild('scene1') scene1!: ElementRef<HTMLCanvasElement>;
  @ViewChild('scene2') scene2!: ElementRef<HTMLCanvasElement>;
  @ViewChild('scene3') scene3!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    if (this.scene1) this.createTorusKnot(this.scene1.nativeElement);
    if (this.scene2) this.createBarChart3D(this.scene2.nativeElement);
    if (this.scene3) this.createSolarPanel(this.scene3.nativeElement);
  }

  private createTorusKnot(canvas: HTMLCanvasElement): void {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0x0077ff, wireframe: true });
    const knot = new THREE.Mesh(geometry, material);
    scene.add(knot);

    camera.position.z = 30;
    const animate = () => {
      requestAnimationFrame(animate);
      knot.rotation.x += 0.01;
      knot.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
  }

  private createBarChart3D(canvas: HTMLCanvasElement): void {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    // Crear barras 3D
    const bars: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap>[] = [];
    const material = new THREE.MeshBasicMaterial({ color: 0xFF5733, wireframe: true });
    for (let i = 0; i < 5; i++) {
      const height = Math.random() * 10 + 5;
      const geometry = new THREE.BoxGeometry(2, height, 2);
      const bar = new THREE.Mesh(geometry, material);
      bar.position.x = i * 5 - 10;
      bar.position.y = height / 2;
      bars.push(bar);
      scene.add(bar);
    }

    camera.position.z = 30;
    const animate = () => {
      requestAnimationFrame(animate);
      bars.forEach(bar => bar.rotation.y += 0.01);
      renderer.render(scene, camera);
    };
    animate();
  }

  private createSolarPanel(canvas: HTMLCanvasElement): void {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    // Crear panel solar
    const panelGeometry = new THREE.PlaneGeometry(10, 5);
    const panelMaterial = new THREE.MeshBasicMaterial({ color: 0xFFD700, wireframe: true });
    const panel = new THREE.Mesh(panelGeometry, panelMaterial);
    panel.rotation.x = -Math.PI / 4;
    scene.add(panel);

    // Crear base del panel
    const baseGeometry = new THREE.CylinderGeometry(1, 1, 10, 16);
    const baseMaterial = new THREE.MeshBasicMaterial({ color: 0x333333, wireframe: true });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -5;
    scene.add(base);

    camera.position.z = 20;
    const animate = () => {
      requestAnimationFrame(animate);
      panel.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
  }
}
