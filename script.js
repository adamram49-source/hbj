import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAMp5-wqinWTl4z0ms6bmnXgm9EvqPcbug",
  authDomain: "mytwoplayergame.firebaseapp.com",
  projectId: "mytwoplayergame",
  databaseURL: "https://mytwoplayergame-default-rtdb.firebaseio.com/",
  storageBucket: "mytwoplayergame.appspot.com",
  messagingSenderId: "1003705475156",
  appId: "1:1003705475156:web:0d56aeef31623413238dc1"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const createBtn = document.getElementById("createGameBtn");
const joinBtn = document.getElementById("joinGameBtn");
const input = document.getElementById("gameCodeInput");

createBtn.onclick = () => {
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();

  set(ref(db, "games/" + code), {
    createdAt: Date.now(),
    players: 1
  });

  alert("קוד המשחק: " + code);

  onValue(ref(db, "games/" + code), snap => {
    if (snap.exists()) {
      console.log("עדכון מהשרת:", snap.val());
    }
  });
};

joinBtn.onclick = () => {
  const code = input.value.trim().toUpperCase();
  const gameRef = ref(db, "games/" + code);

  onValue(gameRef, snap => {
    if (!snap.exists()) {
      alert("קוד לא קיים");
      return;
    }

    set(gameRef, {
      ...snap.val(),
      players: 2
    });

    alert("הצטרפת למשחק!");
  }, { once: true });
};
