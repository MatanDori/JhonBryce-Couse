// טיפוס שמאגד את כל האלמנטים מה-HTML
type DOMAttr = {
  userName: HTMLInputElement | null;
  password: HTMLInputElement | null;
  registerResponse: HTMLDivElement | null;
  loginUserName: HTMLInputElement | null;
  loginPassword: HTMLInputElement | null;
  loginResponse: HTMLDivElement | null;
  authToken: HTMLInputElement | null;
  authResponse: HTMLDivElement | null;
  loadUsersButton: HTMLButtonElement | null;
  usersList: HTMLUListElement | null;
};

// אובייקט שמכיל את האלמנטים מה-HTML
const DOM: DOMAttr = {
  userName: null,
  password: null,
  registerResponse: null,
  loginUserName: null,
  loginPassword: null,
  loginResponse: null,
  authToken: null,
  authResponse: null,
  loadUsersButton: null,
  usersList: null
};

// פונקציה שמבצעת חיבור לאלמנטים והגדרת אירועים
function init() {
  // רישום
  DOM.userName = document.querySelector<HTMLInputElement>("#userName");
  DOM.password = document.querySelector<HTMLInputElement>("#password");
  DOM.registerResponse = document.querySelector("#registerResponse");

  document.getElementById("registerAction")?.addEventListener("click", async () => {
    try {
      const result = await registerApi({
        userName: DOM.userName?.value as string,
        password: DOM.password?.value as string
      });
      DOM.registerResponse!.innerText = result;
    } catch (ex: any) {
      DOM.registerResponse!.innerText = ex.message;
    }
  });

  // התחברות
  DOM.loginUserName = document.querySelector<HTMLInputElement>("#loginUserName");
  DOM.loginPassword = document.querySelector<HTMLInputElement>("#loginPassword");
  DOM.loginResponse = document.querySelector("#loginResponse");

  document.getElementById("loginAction")?.addEventListener("click", async () => {
    try {
      const result = await loginApi({
        userName: DOM.loginUserName?.value as string,
        password: DOM.loginPassword?.value as string
      });
      DOM.loginResponse!.innerText = result;
    } catch (ex: any) {
      DOM.loginResponse!.innerText = ex.message;
    }
  });

  // אימות טוקן
  DOM.authToken = document.querySelector<HTMLInputElement>("#authToken");
  DOM.authResponse = document.querySelector("#authResponse");

  document.getElementById("authenticateAction")?.addEventListener("click", async () => {
    try {
      const result = await authenticateApi(DOM.authToken?.value || "");
      DOM.authResponse!.innerText = result;
    } catch (ex: any) {
      DOM.authResponse!.innerText = ex.message;
    }
  });

  // שליפת משתמשים
  DOM.loadUsersButton = document.querySelector("#loadUsers");
  DOM.usersList = document.querySelector("#usersList");

  DOM.loadUsersButton?.addEventListener("click", async () => {
    const users = await getUsersApi();
    DOM.usersList!.innerHTML = "";
    users.forEach((user) => {
      const li = document.createElement("li");
      li.innerText = user.userName;
      DOM.usersList!.appendChild(li);
    });
  });
}

// פונקציה לרישום משתמש
async function registerApi(payload: { userName: string; password: string }): Promise<string> {
  const response = await fetch("http://localhost:3000/auth/register", {
    method: "POST",
    headers: { "Accept": "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return await response.text();
}

// פונקציה להתחברות
async function loginApi(payload: { userName: string; password: string }): Promise<string> {
  const response = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: { "Accept": "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return await response.text();
}

// פונקציה לאימות טוקן
async function authenticateApi(token: string): Promise<string> {
  const response = await fetch("http://localhost:3000/api/authenticate?token=" + token);
  return await response.text();
}

// פונקציה לשליפת כל המשתמשים
async function getUsersApi(): Promise<{ userName: string }[]> {
  const response = await fetch("http://localhost:3000/users");
  return await response.json();
}

// הפעלת האתחול
init();
