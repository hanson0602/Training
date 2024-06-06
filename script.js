let exercises = [];

const templates = {
  strength: [
    { week: '第一週', percentage: 0.65, sets: 5, reps: 5 },
    { week: '第二週', percentage: 0.75, sets: 4, reps: 5 },
    { week: '第三週', percentage: 0.85, sets: 3, reps: 5 },
    { week: '第四週', reEval: true }
  ],
  hypertrophy: [
    { week: '第一週', percentage: 0.60, sets: 4, reps: 12 },
    { week: '第二週', percentage: 0.70, sets: 4, reps: 10 },
    { week: '第三週', percentage: 0.80, sets: 4, reps: 8 },
    { week: '第四週', reEval: true }
  ],
  fatLoss: [
    { week: '第一週', percentage: 0.55, sets: 4, reps: 15 },
    { week: '第二週', percentage: 0.65, sets: 4, reps: 12 },
    { week: '第三週', percentage: 0.75, sets: 4, reps: 10 },
    { week: '第四週', reEval: true }
  ]
};

function addExercise() {
  const exerciseName = document.getElementById("exercise-name").value;
  const oneRm = parseFloat(document.getElementById("one-rm").value);
  const template = document.getElementById("template-select").value;

  if (!exerciseName || isNaN(oneRm)) {
    alert("請輸入有效的動作名稱和1RM");
    return;
  }

  exercises.push({ name: exerciseName, oneRm: oneRm, template: template });
  updateExerciseList();
  updateTrainingPlan();
}

function updateExerciseList() {
  let list = "<ul>";
  exercises.forEach((exercise, index) => {
    list += `<li>${exercise.name} - 1RM: ${exercise.oneRm}公斤 <button onclick="deleteExercise(${index})">刪除</button></li>`;
  });
  list += "</ul>";
  document.getElementById("exercise-list").innerHTML = list;
}

function roundToNearestFive(weight) {
  return Math.round(weight / 5) * 5;
}

function deleteExercise(index) {
  exercises.splice(index, 1);
  updateExerciseList();
  updateTrainingPlan();
}



function updateTrainingPlan() {
  const templateNames = {
    strength: '力量訓練',
    hypertrophy: '肌肥大訓練',
    fatLoss: '減脂訓練'
  };

  let plan = "<h3>訓練計劃</h3>";
  exercises.forEach((exercise) => {
    const oneRm = exercise.oneRm;
    const template = templates[exercise.template];
    const templateName = templateNames[exercise.template];

    plan += `<h4>${templateName} ${exercise.name}</h4>`;
    plan += "<table border='1'><tr><th>週</th><th>重量 (公斤)</th><th>組數 × 次數</th><th>訓練容量 (公斤)</th><th>完成</th></tr>";

    template.forEach((week) => {
      if (week.reEval) {
        plan += `
          <tr>
            <td>第四週</td>
            <td colspan="4">重新進行1RM測試，並根據新1RM調整接下來的訓練計劃。</td>
          </tr>
        `;
      } else {
        const weight = roundToNearestFive(oneRm * week.percentage);
        plan += `
          <tr>
            <td>${week.week}</td>
            <td>${weight}</td>
            <td>${week.sets}組 × ${week.reps}次</td>
            <td>${weight * week.reps * week.sets}</td>
            <td><input type="checkbox" name="${exercise.name}-${week.week}"></td>
          </tr>
        `;
      }
    });

    plan += "</table>";
  });
  
  
  document.getElementById("training-plan").innerHTML = plan;
}
