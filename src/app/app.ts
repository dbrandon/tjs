console.log('main app aaa');

let js = require('./index')

import angular, {IScope} from 'angular';
import {fn1} from './mylib';

import * as THREE from 'three';



interface MyIscope extends IScope {
  extraValue : string;
}

class ThreeDemo {
  camera : THREE.PerspectiveCamera;
  scene : THREE.Scene;
  renderer : THREE.WebGLRenderer;
  geometry : THREE.BoxGeometry;
  material : THREE.MeshNormalMaterial;
  mesh : THREE.Mesh;

  constructor() {
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    this.camera.position.z = 1;

    this.scene = new THREE.Scene();

    this.geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    this.material = new THREE.MeshNormalMaterial();
    
    this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.scene.add(this.mesh);

    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setAnimationLoop(this.animation.bind(this));

    document.body.appendChild(this.renderer.domElement);
  }

  animation(time : number) {
    this.mesh.rotation.x = time / 2000;
    this.mesh.rotation.y = time / 1000;

    this.renderer.render(this.scene, this.camera);
  }
}

class MyClass {
  private vvv : string;
  constructor($scope : MyIscope) {
    console.log('made a myclass');
    this.vvv = 'hello from ts (update)';
    $scope.extraValue = 'extra stuff here'

    new ThreeDemo();
  }
}

js.doSomething();
fn1();

let app = ()=> {
  return {
    template: require('./app.html').default,
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
}

angular.module('app', [])
  .directive('app', app)
  .controller('AppCtrl', ['$scope', MyClass])
