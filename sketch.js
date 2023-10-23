let cannonAngle = 90; // 총알대의 초기 각도 (90도는 위를 가리킴)
let bulletX, bulletY; // 총알의 초기 위치
let targetX, targetY; // 동그라미의 위치
let score = 0; // 획득한 점수
let gameEnded = false; // 게임 종료 여부
let successSound, hitSound; // 성공 효과음

function preload() {
  successSound = loadSound('yeah.mp3'); // 성공 효과음 로드
  hitSound = loadSound('puuu.mp3'); // 적중 효과음 로드
}

function setup() {
  createCanvas(800, 400);
  bulletX = width / 2;
  bulletY = height;
  targetX = random(width);
  targetY = random(50, height - 50);
}

function draw() {
  background(0);

  if (!gameEnded) {
    // 게임이 종료되지 않은 경우에만 총알대를 움직일 수 있음
    handleInput(); // 키보드 입력 처리
  }

  // 동그라미 그리기
  fill(255, 0, 0);
  ellipse(targetX, targetY, 30, 30);

  // 총알대 그리기
  push();
  translate(bulletX, bulletY);
  rotate(radians(cannonAngle));
  fill(255);
  rect(-10, -5, 20, 10);
  pop();

  // 총알 이동
  if (!gameEnded) {
    bulletX += 5 * cos(radians(cannonAngle));
    bulletY -= 5 * sin(radians(cannonAngle));
  }

  // 총알이 캔버스 밖으로 나가면 리셋
  if (bulletY < 0 || bulletX < 0 || bulletX > width) {
    bulletY = height;
    bulletX = width / 2;
  }

  // 동그라미를 맞춘 경우
  let distance = dist(bulletX, bulletY, targetX, targetY);
  if (distance < 15) {
    score++;
    targetX = random(width);
    targetY = random(50, height - 50);
    // 5점 달성 시 성공 효과음 재생
    if (score >= 5) {
      successSound.play();
    }
    // 맞춘 경우 적중 효과음 재생
    hitSound.play();
  }

  // 점수 표시
  fill(255);
  textSize(24);
  textAlign(RIGHT);
  text("Score: " + score, width - 20, 30);

  // 성공 메시지 표시
  if (score >= 5) {
    gameEnded = true;
    fill(0, 255, 0);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("Success!", width / 2, height / 2);
    // 처음으로 돌아가기 버튼 표시
    textAlign(CENTER);
    textSize(24);
    fill(255);
    text("Restart", width / 2, height / 2 + 50);
  }
}

function keyPressed() {
  // 오른쪽 화살표 키를 누르면 총알대를 왼쪽으로 회전
  if (keyCode === RIGHT_ARROW) {
    cannonAngle -= 5;
  }
  // 왼쪽 화살표 키를 누르면 총알대를 오른쪽으로 회전
  else if (keyCode === LEFT_ARROW) {
    cannonAngle += 5;
  }
}

function handleInput() {
  // 키보드 입력을 처리하는 함수
  // 여기에서 추가적인 입력 로직을 추가할 수 있습니다.
}

function mousePressed() {
  if (gameEnded) {
    // 게임이 종료된 경우 마우스를 클릭하면 게임 재시작
    score = 0;
    gameEnded = false;
    bulletY = height;
    bulletX = width / 2;
    targetX = random(width);
    targetY = random(50, height - 50);
  }
}
