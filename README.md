**8Bit Online Compiler**




## Description

Welcome to 8Bit Online Compiler, a simple and user-friendly web-based compiler that allows you to write and execute code in various programming languages right in your browser. Embrace the nostalgia of 8-bit graphics while coding with ease and convenience.

## Screenshots
![Screenshot of HomePage](https://res.cloudinary.com/djap3kkqi/image/upload/v1773340877/page_1_hzdou3.avif)
Home Page 

![Screenshot of Login Page](https://res.cloudinary.com/djap3kkqi/image/upload/v1773339398/compiler_wvjo0a.avif)
IDE
## Features

- **Language Support**: Write code in popular programming languages, including C, C++, Python and Java.

- **Real-time Output**: See the output of your code instantly as you type, making the debugging process efficient.

- **User-friendly Interface**: Enjoy a clean and intuitive interface designed to enhance your coding experience.

- **Save and Share**: Save your code snippets to your local machine.

- **No Installation Needed**: No need to install any software or set up development environments; start coding right away!

## How to Use

1. Choose a programming language from the dropdown menu.

2. Write your code in the provided editor area.

3. Click the "Run" button to execute the code.

4. The output will be displayed below the editor.

5. To save your code snippet, click the "Save" button and provide a title.

6. To access your saved code snippets, click on the "Saved Codes" tab.

## Structure
```
.
├── backend/            # FastAPI Backend
│   ├── main.py        # Entry point
│   ├── database.py    # Database connection
│   ├── models.py      # SQLModel models
│   └── requirements.txt
├── frontend/           # React + Vite + Tailwind
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
└── vercel.json         # Vercel deployment configuration
```

## Deployment on Vercel

To deploy this project on Vercel, follow these steps:

### 1. Configure Environment Variables
In your Vercel project settings, add the following environment variables:

**Backend:**
- `DATABASE_URL`: Your PostgreSQL connection string (e.g., from Neon, Supabase, or AWS RDS).
- `SECRET_KEY`: A random string for JWT authentication.
- `JDOODLE_CLIENT_ID`: Your JDoodle API Client ID.
- `JDOODLE_CLIENT_SECRET`: Your JDoodle API Client Secret.

**Frontend:**
- `VITE_API_BASE_URL`: Set this to `/api` for production (since we use a rewrite in `vercel.json`).

### 2. Deploy
1. Push your code to a GitHub repository.
2. Connect your repository to Vercel.
3. Vercel will automatically detect the `vercel.json` configuration and deploy both the frontend and backend.

### 3. Local Setup
To run the project locally:

**Backend:**
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Technologies Used

- HTML
- CSS
- JavaScript
- Firebase
- Python

## Demo

Check out the live demo of the 8Bit Online Compiler [here](http://207.246.112.202:8080).

## Future Enhancements

- Support for more programming languages.
- User accounts and personal code repositories.
- Theme customization options for the editor.


## Acknowledgements

We would like to express our appreciation to the open-source community for their valuable tools and resources that made this project possible.

---
Happy coding with 8Bit Online Compiler! 🎮🚀
