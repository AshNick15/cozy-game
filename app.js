// Flower class
class Flower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10; // initial size
    this.color = this.randomFlowerColor(); // Random flower color
    this.growthRate = Math.random() * 0.5 + 0.05; // Random growth speed
  }

  randomFlowerColor() {
    // Random color for the flower
    const colors = ["#FF6347", "#FFD700", "#FF69B4", "#87CEFA"]; // Red, Yellow, Pink, Light Blue
    return colors[Math.floor(Math.random() * colors.length)];
  }

  grow() {
    if (this.size < 40) {
      this.size += this.growthRate; // Grow the flower
    }
  }

  draw() {
    // Create a flower element
    const flowerElement = document.createElement("div");
    flowerElement.classList.add("flower");
    flowerElement.style.width = `${this.size}px`;
    flowerElement.style.height = `${this.size}px`;
    flowerElement.style.backgroundColor = this.color;
    flowerElement.style.left = `${this.x - this.size / 2}px`;
    flowerElement.style.top = `${this.y - this.size / 2}px`;

    return flowerElement;
  }
}

// Main garden logic
const flowerContainer = document.getElementById("flower-container");
const flowers = [];

function plantFlower(event) {
  // Get position of the mouse click
  const x = event.clientX - flowerContainer.offsetLeft;
  const y = event.clientY - flowerContainer.offsetTop;

  // Create a new flower at the clicked position
  const flower = new Flower(x, y);
  flowers.push(flower);

  // Draw the flower immediately
  flowerContainer.appendChild(flower.draw());
}

// Update flowers (let them grow over time)
function updateFlowers() {
  flowers.forEach((flower) => {
    flower.grow();
    const flowerElements = document.querySelectorAll(".flower");
    flowerElements.forEach((flowerElement, index) => {
      if (index === flowers.indexOf(flower)) {
        flowerElement.style.width = `${flower.size}px`;
        flowerElement.style.height = `${flower.size}px`;
        flowerElement.style.left = `${flower.x - flower.size / 2}px`;
        flowerElement.style.top = `${flower.y - flower.size / 2}px`;
      }
    });
  });
}

// Add event listener to plant flowers on click
flowerContainer.addEventListener("click", plantFlower);

// Update flower growth every 50ms
setInterval(updateFlowers, 50);
