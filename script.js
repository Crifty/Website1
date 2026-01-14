/* ================= CAREER DATABASE ================= */

const careerBuckets = {
    "Indoor-Solo": [
        {
            name: "Software Developer",
            introSalary: "₹5–8 LPA",
            experiencedSalary: "₹15–30+ LPA",
            interests: ["Technology"],
            info: "Software Developers design and build applications, websites, and systems. The role requires logical thinking, coding skills, and continuous learning. Most work is independent and computer-based."
        },
        {
            name: "Data Analyst",
            introSalary: "₹4–7 LPA",
            experiencedSalary: "₹12–20 LPA",
            interests: ["Technology", "Science", "Business"],
            info: "Data Analysts study data to find patterns and insights that help businesses make decisions. The work involves statistics, tools like Excel or Python, and focused analytical thinking."
        },
        {
            name: "Graphic Designer",
            introSalary: "₹3–5 LPA",
            experiencedSalary: "₹8–15 LPA",
            interests: ["Art", "Media"],
            info: "Graphic Designers create visual content such as logos, posters, and social media designs. This career suits creative individuals who enjoy independent work and design tools."
        },
        {
            name: "Content Writer",
            introSalary: "₹3–5 LPA",
            experiencedSalary: "₹8–12 LPA",
            interests: ["Media", "Art"],
            info: "Content Writers create articles, blogs, and marketing material. This role focuses on research, creativity, and strong language skills."
        }
    ],

    "Indoor-Group": [
        {
            name: "Teacher / Professor",
            introSalary: "₹2–4 LPA",
            experiencedSalary: "₹6–12+ LPA",
            interests: ["Education", "Science", "Art"],
            info: "Teachers educate students in classrooms or institutions. The role involves communication, teamwork, and guiding learners academically and personally."
        },
        {
            name: "Product Manager",
            introSalary: "₹6–10 LPA",
            experiencedSalary: "₹20–35 LPA",
            interests: ["Business", "Technology"],
            info: "Product Managers coordinate between technical teams, designers, and business stakeholders. They plan product strategy and ensure successful delivery."
        },
        {
            name: "HR Manager",
            introSalary: "₹4–6 LPA",
            experiencedSalary: "₹10–18 LPA",
            interests: ["Business"],
            info: "HR Managers handle recruitment, employee relations, and workplace culture. This role requires communication, leadership, and people management."
        },
        {
            name: "Marketing Manager",
            introSalary: "₹5–8 LPA",
            experiencedSalary: "₹15–25 LPA",
            interests: ["Business", "Media"],
            info: "Marketing Managers plan campaigns and brand strategies. The role involves teamwork, creativity, and market analysis."
        }
    ],

    "Outdoor-Solo": [
        {
            name: "Fitness Trainer",
            introSalary: "₹2–4 LPA",
            experiencedSalary: "₹6–10+ LPA",
            interests: ["Sports", "Health"],
            info: "Fitness Trainers help individuals achieve physical fitness goals. The job involves personal training, discipline, and health knowledge."
        },
        {
            name: "Photographer",
            introSalary: "₹3–5 LPA",
            experiencedSalary: "₹10–20 LPA",
            interests: ["Art", "Media"],
            info: "Photographers capture images for events, nature, or media. The career suits independent and creative individuals who enjoy outdoor work."
        },
        {
            name: "Field Surveyor",
            introSalary: "₹3–5 LPA",
            experiencedSalary: "₹8–12 LPA",
            interests: ["Environment", "Science"],
            info: "Field Surveyors collect land and environmental data. The work is location-based and requires accuracy and technical tools."
        }
    ],

    "Outdoor-Group": [
        {
            name: "Civil Engineer",
            introSalary: "₹4–6 LPA",
            experiencedSalary: "₹12–25 LPA",
            interests: ["Technology", "Environment"],
            info: "Civil Engineers manage construction projects such as roads and buildings. The job involves site work, teamwork, and technical planning."
        },
        {
            name: "Environmental Scientist",
            introSalary: "₹4–6 LPA",
            experiencedSalary: "₹10–18 LPA",
            interests: ["Environment", "Science"],
            info: "Environmental Scientists work on solving environmental problems. They collaborate with teams in field and research-based roles."
        },
        {
            name: "Sports Coach",
            introSalary: "₹3–5 LPA",
            experiencedSalary: "₹8–15 LPA",
            interests: ["Sports", "Health"],
            info: "Sports Coaches train teams and athletes. This role involves leadership, teamwork, and outdoor physical activity."
        }
    ]
};

/* ================= FORM HANDLING ================= */

if (document.getElementById("quizForm")) {
    document.getElementById("quizForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const workMode = document.getElementById("workMode").value;
        const workStyle = document.getElementById("workStyle").value;
        const interests = Array.from(
            document.querySelectorAll('input[name="interests"]:checked')
        ).map(i => i.value);

        localStorage.setItem("workMode", workMode);
        localStorage.setItem("workStyle", workStyle);
        localStorage.setItem("interests", JSON.stringify(interests));

        window.location.href = "results.html";
    });
}

/* ================= RESULTS DISPLAY ================= */

if (document.getElementById("results")) {
    const workMode = localStorage.getItem("workMode");
    const workStyle = localStorage.getItem("workStyle");
    const interests = JSON.parse(localStorage.getItem("interests")) || [];

    const bucketKey = `${workMode}-${workStyle}`;
    const bucketCareers = careerBuckets[bucketKey];

    // Score careers by interest overlap
    const ranked = bucketCareers.map(career => {
        let score = 0;
        career.interests.forEach(i => {
            if (interests.includes(i)) score++;
        });
        return { ...career, score };
    });

    ranked.sort((a, b) => b.score - a.score);

    const finalCareers = ranked.slice(0, 3); // ALWAYS 3

    const resultsDiv = document.getElementById("results");

    finalCareers.forEach(c => {
        const card = document.createElement("div");
        card.className = "career-card";
        card.innerHTML = `
            <h2>${c.name}</h2>
            <p>${c.info}</p>
            <p><strong>Starting Salary:</strong> ${c.introSalary}</p>
            <p><strong>Salary After Experience:</strong> ${c.experiencedSalary}</p>
            <hr>
        `;
        resultsDiv.appendChild(card);
    });
}
