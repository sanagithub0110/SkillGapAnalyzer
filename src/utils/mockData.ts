export const MOCK_USER = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  joinedDate: "Jan 2024",
};

export const ROLES = [
  { id: "web-dev", name: "Web Developer", icon: "Globe" },
  { id: "software-dev", name: "Software Developer", icon: "Code" },
  { id: "data-analyst", name: "Data Analyst", icon: "BarChart" },
  { id: "devops", name: "DevOps Engineer", icon: "Server" },
];

export const SKILL_SUGGESTIONS = [
  "React", "TypeScript", "Node.js", "Python", "SQL", "Docker", "AWS", "Tailwind CSS", "GraphQL", "Kubernetes", "Next.js", "MongoDB"
];

export const MOCK_ANALYSIS_RESULT = {
  role: "Web Developer",
  score: 78,
  matchedSkills: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Git"],
  missingSkills: ["TypeScript", "Next.js", "Node.js", "GraphQL", "Unit Testing"],
  learningPath: [
    {
      skill: "TypeScript",
      course: "TypeScript Masterclass",
      link: "https://youtube.com/results?search_query=typescript+masterclass",
      project: "Build a type-safe E-commerce Dashboard"
    },
    {
      skill: "Next.js",
      course: "Next.js 14 Full Course",
      link: "https://youtube.com/results?search_query=nextjs+14+tutorial",
      project: "Server-side rendered Blog Platform"
    },
    {
      skill: "Node.js",
      course: "Backend Development with Node",
      link: "https://youtube.com/results?search_query=nodejs+backend+tutorial",
      project: "RESTful API for Task Management"
    }
  ],
  history: [
    { role: "Web Developer", score: 78, date: "2024-03-25" },
    { role: "Software Developer", score: 65, date: "2024-02-10" },
    { role: "Frontend Engineer", score: 82, date: "2024-01-15" }
  ]
};
