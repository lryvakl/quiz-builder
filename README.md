# Quiz Builder

---

###  Deployment : 

  https://quiz-builder-psi.vercel.app
---
### Tech Stack

### **Backend**
- Node.js + Express.js
- TypeScript
- Prisma ORM
- PostgreSQL


### **Frontend**
- React + Next.js 
- TypeScript
- Tailwind CSS


---
### How to create a sample quiz

**Option 1** — Through frontend UI:

1. Go to deployed site → /create
 https://quiz-builder-psi.vercel.app/create

2. Fill in the form:
   
- Quiz title: something short, e.g. Frontend Frameworks

- Add questions

3. Click Submit Quiz
   
4. You should see a success snackbar.


5. Navigate to /quizzes (arrow button)— your quiz will appear in the list.
      
6. Click the arrow to view it at /quizzes/[id].
   
      ---
**Option 2** — Insert directly via your backend API:

You can make a POST request to your backend endpoint:

```bash
curl -X POST https://quiz-builder-production.up.railway.app/quizzes \
-H "Content-Type: application/json" \
-d '{
  "title": "Frontend Frameworks",
  "questions": [
    {
      "text": "Which frontend framework do you prefer?",
      "type": "CHECKBOX",
      "options": ["React", "Angular", "Vue"]
    },
    {
      "text": "Do you use TypeScript?",
      "type": "BOOLEAN"
    },
    {
      "text": "What is your favorite CSS framework?",
      "type": "INPUT"
    }
  ]
}'
```
If it returns JSON with your quiz data, it means it’s been saved successfully.
   

