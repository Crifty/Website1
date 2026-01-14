/* ================= CAREER DATABASE ================= */

const careerBuckets = {
    "Indoor-Solo": [
        {
            name: "Software Developer",
            interests: ["Technology"],
            introSalary: "₹5–8 LPA",
            experiencedSalary: "₹15–30+ LPA",
            info: "Software Developers design and build applications, websites, and systems. The work is independent, logical, and computer-based."
        },
        {
            name: "Data Analyst",
            interests: ["Technology", "Science", "Business"],
            introSalary: "₹4–7 LPA",
            experiencedSalary: "₹12–20 LPA",
            info: "Data Analysts interpret data to find trends and insights. This role requires analytical thinking and strong problem-solving skills."
        },
        {
            name: "Graphic Designer",
            interests: ["Art", "Media"],
            introSalary: "₹3–5 LPA",
            experiencedSalary: "₹8–15 LPA",
            info: "Graphic Designers create visual content such as logos, posters, and digital designs using creative tools."
        },
        {
            name: "Content Writer",
            interests: ["Media", "Art"],
            introSalary: "₹3–5 LPA",
            experiencedSalary: "₹8–12 LPA",
            info: "Content Writers create blogs, articles, and marketing material. The work involves creativity, research, and writing skills."
        }
    ],

    "Indoor-Group": [
        {
            name: "Teacher / Professor",
            interests: ["Education", "Science", "Art"],
            introSalary: "₹2–4 LPA",
            experiencedSalary: "₹6–12+ LPA",
            info: "Teachers educate and mentor students in classrooms. The role involves communication, teamwork, and subject expertise."
        },
        {
            name: "Product Manager",
            interests: ["Business", "Technology"],
            introSalary: "₹6–10 LPA",
            experiencedSalary: "₹20–35 LPA",
            info: "Product Managers coordinate between technical and business teams to build successful products."
        },
        {
            name: "HR Manager",
            interests: ["Business"],
            introSalary: "₹4–6 LPA",
            experiencedSalary: "₹10–18 LPA",
            info: "HR Managers handle recruitment, employee relations, and organizational culture."
        },
        {
            name: "Marketing Manager",
            interests: ["Business", "Media"],
            introSalary: "₹5–8 LPA",
            experiencedSalary: "₹15–25 LPA",
            info: "Marketing Managers plan and execute branding and promotional campaigns with cross-functional teams."
        }
    ],

    "Outdoor-Solo": [
        {
            name: "Fitness Trainer",
            interests: ["Sports", "Health"],
            introSalary: "₹2–4 LPA",
            experiencedSalary: "₹6–10+ LPA",
            info: "Fitness Trainers guide individuals to improve physical health through training and discipline."
        },
        {
            name: "Photographer",
            interests: ["Art", "Media"],
            introSalary: "₹3–5 LPA",
            experiencedSalary: "₹10–20 LPA",
            info: "Photographers capture images for events, travel, or media projects, often working independently outdoors."
        },
        {
            name: "Field Surveyor",
            interests: ["Environment", "Science"],
            introSalary: "₹3–5 LPA",
            experiencedSalary: "₹8–12 LPA",
            info: "Field Surveyors collect land and environmental data using technical tools in outdoor settings."
        }
    ],

    "Outdoor-Group": [
        {
            name: "Civil Engineer",
            interests: ["Technology", "Environment"],
            introSalary: "₹4–6 LPA",
            experiencedSalary: "₹12–25 LPA",
            info: "Civil Engineers manage construction projects such as roads and buildings, working with on-site teams."
        },
        {
            name: "Environmental Scientist",
            interests: ["Environment", "Science"],
            introSalary: "₹4–6 LPA",
            experiencedSalary: "₹10–18 LPA",
            info: "Environmental Scientists work with teams to address pollution, sustainability, and climate issues."
        },
        {
            name: "Sports Coach",
            interests: ["Sports", "Health"],
            introSalary: "₹3–5 LPA",
            experiencedSalary: "₹8–15 LPA",
            info: "Sports Coaches train athletes and teams, focusing on performance, strategy, and discipline."
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

/* ================= RESULTS LOGIC (NO REPEATS) ================= */

if (document.getElementById("results")) {
    const workMode = localStorage.getItem("workMode");
    const workStyle = localStorage.getItem("workStyle");
    const interests = JSON.parse(localStorage.getItem("interests")) || [];

    const bucketKey = `${workMode}-${workStyle}`;
    const bucket = careerBuckets[bucketKey];

    const selectedCareers = [];
    const usedNames = new Set();

    // 1️⃣ Pick one career per interest
    interests.forEach(interest => {
        if (selectedCareers.length >= 3) return;

        const match = bucket.find(c =>
            c.interests.includes(interest) &&
            !usedNames.has(c.name)
        );

        if (match) {
            selectedCareers.push(match);
            usedNames.add(match.name);
        }
    });

    // 2️⃣ Fill remaining slots with fallback careers
    bucket.forEach(c => {
        if (selectedCareers.length < 3 && !usedNames.has(c.name)) {
            selectedCareers.push(c);
            usedNames.add(c.name);
        }
    });

    // 3️⃣ Display results
    const resultsDiv = document.getElementById("results");

    selectedCareers.forEach(c => {
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
