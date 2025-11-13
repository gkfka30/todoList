let user = document.querySelector("#user"),
  add = document.querySelector("#add"),
  taskBoard = document.querySelector("#taskBoard");
let taskList = [];

add.addEventListener("click", addTask);

user.addEventListener("keypress", (event) => {
  // Enter 키(Key Code 13)가 눌리고, 입력 값이 공백이 아닐 경우
  if (event.key === "Enter" && user.value.trim() !== "") {
    addTask();
  }
});

function addTask() {
  // 1. 입력 값 공백 검사 (유효성 검증)
  if (user.value.trim() === "") {
    // 입력 값이 공백이거나 비어있으면 함수 실행을 중단(return)하고 할 일을 추가하지 않습니다.
    alert("할 일을 입력해주세요."); // 사용자에게 알림 (선택 사항)
    user.value = ""; // 공백만 입력했을 경우 input을 비워줍니다.
    return;
  }

  let task = {
    id: randomId(), //순번
    taskContent: user.value, //입력한 내용
    isComplete: false, //task-done을 붙이기 위함
  };

  taskList.push(task);
  render();
  user.value = "";
}

function render() {
  //   console.log("render");
  console.log(taskList);
  let result = "";

  taskList.forEach((task) => {
    if (task.isComplete == true) {
      result += `
    <div class="task">
        <div class="task-done">${task.taskContent}</div>
        <div>
            <button onclick="complete(${task.id})">check</button>
            <button onclick="deleteTask(${task.id})">delete</button>
        </div>
    </div>
        `;
    } else {
      result += `
    <div class="task">
        <div>${task.taskContent}</div>
        <div>
            <button onclick="complete(${task.id})">check</button>
            <button onclick="deleteTask(${task.id})">delete</button>
        </div>
    </div>
        `;
    }
  });
  taskBoard.innerHTML = result;
}

function complete(id) {
  console.log("complete");
  taskList.forEach((task) => {
    if (task.id == id) {
      // task.isComplete = true;
      task.isComplete = !task.isComplete;
    }
  });

  render();
}

//체크버튼을 클리하면 모두 true로 변경됨
//날짜를 이용해서 index번호를 만들려고함
//배열에 있는 index번호는 delete를 하게 되면 번호가 바뀜
function randomId() {
  //   console.log(Date.now());
  return Date.now();
}

function deleteTask(id) {
  // console.log("delete");
  // console.log(id);

  taskList = taskList.filter((task) => task.id != id);
  render();
}

// 마우스 커서 만들기
let cursorImg = document.querySelector("#cursor-img");

// 마우스 움직임 이벤트를 감지
document.addEventListener("mousemove", (e) => {
  // 마우스의 X, Y 좌표를 가져와서 이미지의 위치를 설정

  // -25px, -25px는 이미지의 크기(50px)의 절반을 빼서 커서 중앙에 오도록 조정하는 값입니다.
  cursorImg.style.transform = `translate(${e.clientX - 25}px, ${
    e.clientY - 25
  }px)`;
});
