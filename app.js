class Flower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10; // initial size
    this.color = this.randomFlowerColor(); // Random flower color
    this.growthRate = Math.random() * 0.5 + 0.05; // Random growth speed
  }

  randomFlowerColor() {
    const colors = ["#FF6347", "#FFD700", "#FF69B4", "#87CEFA"]; // Red, Yellow, Pink, Light Blue
    return colors[Math.floor(Math.random() * colors.length)];
  }

  grow() {
    if (this.size < 40) {
      this.size += this.growthRate; // Grow the flower
    }
  }

  draw() {
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

// Create growing emoji flower on click
function createGrowingFlowerEmoji(x, y) {
  const emojiFlower = document.createElement("div");
  emojiFlower.classList.add("emoji-flower");
  emojiFlower.textContent = "🌸"; // Flower emoji
  emojiFlower.style.left = `${x - 25}px`; // Positioning the emoji at the click point
  emojiFlower.style.top = `${y - 25}px`;

  document.getElementById("emoji-flower-container").appendChild(emojiFlower);

  // After animation completes, we don't need to remove the emoji since it stays
}

// Flower planting logic (same as before)
const flowerContainer = document.getElementById("flower-container");
const flowers = [];

function plantFlower(event) {
  const x = event.clientX - flowerContainer.offsetLeft;
  const y = event.clientY - flowerContainer.offsetTop;

  const flower = new Flower(x, y);
  flowers.push(flower);

  flowerContainer.appendChild(flower.draw());

  // Create a growing emoji flower at the clicked position
  createGrowingFlowerEmoji(event.clientX, event.clientY);
}

// Update flowers' growth
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

// Event listener for planting flowers
flowerContainer.addEventListener("click", plantFlower);

// Game update loop
setInterval(() => {
  updateFlowers();
}, 50);
