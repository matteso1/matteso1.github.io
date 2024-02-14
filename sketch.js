// Array to hold particles
let particles = [];
// Number of particles
const numParticles = 150;
// Maximum distance for connection between particles
const maxConnectionDistance = 140;
// Radius of gravity influence
const gravityRadius = 60;
// Strength of gravity
const gravityStrength = 0.20;

// Setup function: runs once at the beginning
function setup() {
  // Create canvas that fills the entire window
  createCanvas(windowWidth, windowHeight);
  // Create particles and add them to the array
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

// Draw function: continuously called to update the canvas
function draw() {
  // Set background color to black
  background(0);
  
  // Apply gravity from mouse position to particles
  let gravity = createVector(mouseX, mouseY);
  for (let i = 0; i < particles.length; i++) {
    // Calculate distance between particle and mouse
    let distance = p5.Vector.dist(gravity, particles[i].pos);
    // Apply gravity if within gravity radius
    if (distance < gravityRadius) {
      let gravityForce = p5.Vector.sub(gravity, particles[i].pos);
      gravityForce.setMag(gravityStrength);
      particles[i].applyForce(gravityForce);
    }
  }
  
  // Draw lines between particles
  for (let i = 0; i < particles.length; i++) {
    for (let j = 0; j < particles.length; j++) {
      // Draw line if particles are close enough
      if (i !== j && dist(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y) < maxConnectionDistance) {
        // Set the color of the damn lines
        stroke(255, 50,);
        line(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y);
      }
    }
  }
  
  // Draw lines from particles to mouse position
  for (let i = 0; i < particles.length; i++) {
    let distanceToMouse = p5.Vector.dist(particles[i].pos, gravity);
    // Draw line if particle is close enough to mouse
    if (distanceToMouse < maxConnectionDistance) {
      stroke(255, 50);
      line(particles[i].pos.x, particles[i].pos.y, gravity.x, gravity.y);
    }
  }
  
  // Update and display particles
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
  }
}

// Particle class definition
class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.acc = createVector(0, 0);
    this.maxSpeed = 3;
    this.maxForce = 0.1;
  }

  // Apply force to particle
  applyForce(force) {
    this.acc.add(force);
  }

  // Update particle's position and velocity
  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);

    // Wrap around screen edges
    if (this.pos.x > width) {
      this.pos.x = 0;
    } else if (this.pos.x < 0) {
      this.pos.x = width;
    }

    if (this.pos.y > height) {
      this.pos.y = 0;
    } else if (this.pos.y < 0) {
      this.pos.y = height;
    }
  }

  // Display particle as an ellipse
  display() {
    noStroke();
    //stroke(235,54, 30)
    fill(255);
    ellipse(this.pos.x, this.pos.y, 5, 5);
  }
}
