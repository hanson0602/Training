let exercises = [];

function addExercise() {
  const exerciseName = document.getElementById("exercise-name").value;
  const oneRm = parseFloat(document.getElementById("one-rm").value);

  if (!exerciseName || isNaN(oneRm)) {
    alert("請輸入有效的動作名稱和1RM");
    return;
  }

  exercises.push({ name: exerciseName, oneRm: oneRm });
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
  let plan = "<h3>訓練計劃</h3>";
  exercises.forEach((exercise) => {
    const oneRm = exercise.oneRm;
    plan += `
       <h4>${exercise.name}</h4>
      <table border="1">
        <tr>
          <th>週</th>
          <th>重量 (公斤)</th>
          <th>組數 × 次數</th>
          <th>訓練容量 (公斤)</th>
          <th>完成</th>
        </tr>
        <tr>
          <td>第一週</td>
          <td>${roundToNearestFive(oneRm * 0.60)}</td>
          <td>4組 × 12次</td>
          <td>${roundToNearestFive(oneRm * 0.60) * 12 * 4}</td>
          <td><input type="checkbox" name="${exercise.name}-week1"></td>
        </tr>
        <tr>
          <td>第二週</td>
          <td>${roundToNearestFive(oneRm * 0.70)}</td>
          <td>4組 × 10次</td>
          <td>${roundToNearestFive(oneRm * 0.70) * 10 * 4}</td>
          <td><input type="checkbox" name="${exercise.name}-week2"></td>
        </tr>
        <tr>
          <td>第三週</td>
          <td>${roundToNearestFive(oneRm * 0.80)}</td>
          <td>4組 × 8次</td>
          <td>${roundToNearestFive(oneRm * 0.80) * 8 * 4}</td>
          <td><input type="checkbox" name="${exercise.name}-week3"></td>
        </tr>
        <tr>
          <td>第四週</td>
          <td>重新評估1RM</td>
          <td colspan="3">重新進行1RM測試，並根據新1RM調整接下來的訓練計劃。</td>
        </tr>
      </table>
    `;
  });

    
    document.getElementById("training-plan").innerHTML = plan;
}
