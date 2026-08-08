import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./supabase-config.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const loginView = document.getElementById("login-view");
const dashView = document.getElementById("dash-view");
const loginForm = document.getElementById("login-form");
const loginBtn = document.getElementById("login-btn");
const loginStatus = document.getElementById("login-status");
const logoutBtn = document.getElementById("logout-btn");
const refreshBtn = document.getElementById("refresh-btn");
const tbody = document.getElementById("inquiries-body");
const emptyEl = document.getElementById("dash-empty");

function showStatus(el, message, ok) {
  el.textContent = message;
  el.classList.remove("ok", "err");
  el.classList.add("show", ok ? "ok" : "err");
}

function fmtDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" }) +
    " - " + d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

async function checkSession() {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    showDashboard();
  } else {
    showLogin();
  }
}

function showLogin() {
  loginView.style.display = "block";
  dashView.style.display = "none";
}

function showDashboard() {
  loginView.style.display = "none";
  dashView.style.display = "block";
  loadInquiries();
}

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  loginBtn.disabled = true;
  loginBtn.textContent = "Signing in...";

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    showStatus(loginStatus, "Invalid email or password.", false);
    loginBtn.disabled = false;
    loginBtn.textContent = "Sign In";
    return;
  }

  showDashboard();
});

logoutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut();
  showLogin();
});

refreshBtn.addEventListener("click", loadInquiries);

async function loadInquiries() {
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    emptyEl.style.display = "block";
    emptyEl.textContent = "Couldn't load inquiries. Check your Supabase connection.";
    tbody.innerHTML = "";
    return;
  }

  renderStats(data);
  renderTable(data);
}

function renderStats(rows) {
  const total = rows.length;
  const newCount = rows.filter(r => r.status === "new" || !r.status).length;
  const contacted = rows.filter(r => r.status === "contacted").length;
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const week = rows.filter(r => new Date(r.created_at).getTime() >= weekAgo).length;

  document.getElementById("stat-total").textContent = total;
  document.getElementById("stat-new").textContent = newCount;
  document.getElementById("stat-contacted").textContent = contacted;
  document.getElementById("stat-week").textContent = week;
}

function renderTable(rows) {
  if (!rows.length) {
    tbody.innerHTML = "";
    emptyEl.style.display = "block";
    emptyEl.textContent = "No legacy inquiries yet.";
    return;
  }
  emptyEl.style.display = "none";

  tbody.innerHTML = rows.map(row => `
    <tr data-id="${row.id}">
      <td>${fmtDate(row.created_at)}</td>
      <td>${escapeHtml(row.name || "")}</td>
      <td>
        <a href="tel:${escapeHtml(row.phone || "")}" style="color:var(--deep-blue); text-decoration:none;">${escapeHtml(row.phone || "")}</a><br>
        <a href="mailto:${escapeHtml(row.email || "")}" style="color:var(--slate); text-decoration:none; font-size:0.85em;">${escapeHtml(row.email || "")}</a>
      </td>
      <td>${escapeHtml(row.service || "")}</td>
      <td>${escapeHtml(row.property_type || "")}</td>
      <td>${escapeHtml(row.address || "")}</td>
      <td class="msg">${escapeHtml(row.message || "-")}</td>
      <td>
        <select class="status-select" data-id="${row.id}">
          ${["new", "contacted", "quoted", "closed"].map(s =>
            `<option value="${s}" ${((row.status || "new") === s) ? "selected" : ""}>${s}</option>`
          ).join("")}
        </select>
      </td>
    </tr>
  `).join("");

  tbody.querySelectorAll(".status-select").forEach(sel => {
    sel.addEventListener("change", async (e) => {
      const id = e.target.dataset.id;
      const status = e.target.value;
      const { error } = await supabase.from("inquiries").update({ status }).eq("id", id);
      if (error) console.error(error);
      else loadInquiries();
    });
  });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

checkSession();
