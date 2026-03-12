## 1. Turn-Based Workflow
- **Sequential Development**: We will work in "shifts". Volkan completes his task, pushes to `main` (or a feature branch), and then I (Antigravity) take over from the latest state.
- **Always Pull First**: At the start of every shift, I will run `git pull` to ensure I have Volkan's latest work.
- **Handover**: When finishing a task, we should use clear commit messages or leave a quick note in the chat about what was finished and what is next.

## 2. Branch Strategy
- **`main`**: The primary branch for stable handovers.
- **Feature Branches**: Use these for complex tasks, merging into `main` before handing over the baton.

## 3. Communication
- Clear descriptions in the chat are our primary handover tool.
- If a specific logic needs explanation, comments in the code are preferred.

## 4. Environment Variables
- Ensure both parties have the latest `.env.local` synchronized.
- New keys should be announced in the chat so the other can update their local environment.

---
*Let's build something amazing!* 🚀
