const BookData = [
  {
    id: 1,
    title: "Moodle For Dummies",
    category: "Top Recommended",
    price: 299,
    Max_Price: 400,
    image: "/image/Moodle.jpg",
    pdf: "/asset/Moodle_For_Dummies_.pdf",
    rating: 4.6,
    description:
      "A beginner-friendly guide to Moodle that explains how to create, manage, and deliver online courses. Ideal for teachers, students, and educators who want to understand e-learning platforms in a simple and practical way."
  },
  {
    id: 2,
    title: "Homeschooling For Dummies",
    category: "Top Recommended",
    price: 249,
    Max_Price: 456,
    image: "/image/Homeschooling.jpg",
    pdf: "/asset/Homeschooling_for_Dummies.pdf",
    rating: 4.4,
    description:
      "This book provides a complete introduction to homeschooling, covering curriculum planning, teaching techniques, and student assessment. Perfect for parents and educators looking for flexible learning solutions."
  },
  {
    id: 3,
    title: "American Sign Language",
    category: "Top Recommended",
    price: 199,
    Max_Price: 600,
    image: "/image/American_Sign_Language.jpg",
    pdf: "/asset/American_Sign_Language_Book.pdf",
    rating: 4.3,
    description:
      "An introductory guide to American Sign Language that focuses on basic signs, grammar, and everyday communication. Suitable for beginners interested in learning sign language for personal or professional use."
  },
  {
    id: 4,
    title: "Physics Workbook",
    category: "Top Recommended",
    price: 279,
    Max_Price: 300,
    image: "/image/Physics.jpg",
    pdf: "/asset/Physics_Workbook.pdf",
    rating: 4.5,
    description:
      "A practice-oriented physics workbook designed to strengthen conceptual understanding through solved examples and exercises. Useful for students preparing for exams and building strong fundamentals in physics."
  },
  {
    id: 5,
    title: "MS Excel",
    category: "Top Recommended",
    price: 199,
    Max_Price: 450,
    image: "/image/Ms_Excel.jpg",
    pdf: "/asset/Ms_Excel.pdf",
    rating: 4.2,
    description:
      "A practical guide to Microsoft Excel covering spreadsheets, formulas, charts, and data analysis tools. Ideal for students, professionals, and beginners who want to improve productivity and data-handling skills."
  },
   {
    id: 6,
    title: "WebEx Web Meetings For Dummies",
    category: "Programming And Tech",
    price: 259,
    Max_Price: 700,
    image: "/image/Web_Meeting.jpg",
    pdf: "/asset/WebEx_Web_Meetings_For_Dummies.pdf",
    rating: 4.4,
    description:
      "This book explains how to use WebEx effectively for online meetings, webinars, and virtual collaboration. Suitable for remote workers, students, and professionals working in virtual environments."
  },
  {
    id: 7,
    title: "Robotic Process Automation For Dummies",
    category: "Programming And Tech",
    price: 299,
    Max_Price: 480,
    image: "/image/Robotic_Process.jpg",
    pdf: "/asset/Robotic_Process_Automation_For_Dummies.pdf",
    rating: 4.5,
    description:
      "An introductory guide to Robotic Process Automation (RPA) that explains automation concepts, tools, and real-world business use cases. Ideal for IT students and professionals exploring automation technologies."
  },
  {
    id: 8,
    title: "Optical Network",
    category: "Programming And Tech",
    price: 279,
    Max_Price: 700,
    image: "/image/Optical_Network.jpg",
    pdf: "/asset/Optical_Network.pdf",
    rating: 4.2,
    description:
      "This book introduces optical networking concepts including fiber optics, transmission techniques, and network design. Useful for engineering students studying modern communication networks."
  },
  {
    id: 9,
    title: "PHP 5 For Dummies",
    category: "Programming And Tech",
    price: 249,
    Max_Price: 500,
    image: "/image/PHP_5.jpg",
    pdf: "/asset/PHP_5_For_Dummies.pdf",
    rating: 4.3,
    description:
      "A beginner-friendly guide to PHP 5 that covers server-side scripting, form handling, and database interaction. Suitable for students and beginners learning web development."
  },
  {
    id: 10,
    title: "PHP MySQL Everyday Apps For Dummies",
    category: "Programming And Tech",
    price: 269,
    Max_Price: 350,
    image: "/image/PHP_MySQL.jpg",
    pdf: "/asset/PHP_MySQL_Everyday_Apps_For_Dummies.pdf",
    rating: 4.4,
    description:
      "This book focuses on building real-world web applications using PHP and MySQL. Ideal for learners who want hands-on experience in backend web development."
  },
  {
    id: 11,
    title: "Long Walk to Freedom",
    category: "Biography",
    price: 299,
    Max_Price: 550,
    image: "/image/Long Walk to Freedom.jpg",
    pdf: "/asset/Long_Walk_to_Freedom_The_Autobiography_of_Nelson_Mandela_by_Nelson.pdf",
    rating: 4.8,
    description:
      "The powerful autobiography of Nelson Mandela that narrates his journey from childhood to becoming the first Black president of South Africa. A deeply inspiring story of courage, sacrifice, and freedom."
  },
  {
    id: 12,
    title: "The Girl in Room 105",
    category: "Fiction",
    price: 199,
    Max_Price: 399,
    image: "/image/The Girl in Room.jpg",
    pdf: "/asset/The Girl in Room 105 by Chetan Bhagat.pdf",
    rating: 4.3,
    description:
      "A gripping romantic thriller by Chetan Bhagat that explores love, heartbreak, and unexpected twists. The story revolves around obsession, investigation, and emotional complexity."
  },
  {
    id: 13,
    title: "Half Girlfriend",
    category: "Fiction",
    price: 179,
    Max_Price: 350,
    image: "/image/Half Girlfriend.jpg",
    pdf: "/asset/Half Girlfriend by Chetan Bhagat.pdf",
    rating: 4.2,
    description:
      "A popular romantic novel by Chetan Bhagat that portrays the story of a boy from rural India and a girl from Delhi, highlighting social differences, dreams, and emotional struggles."
  },
  {
    id: 14,
    title: "Mahavoddha Kalki: Sword of Shiva",
    category: "Mythology",
    price: 249,
    Max_Price: 499,
    image: "/image/Mahayoddha Kalki.jpg",
    pdf: "/asset/Mahavoddha Kalki_Sword of Shiva by Kevin Missal.pdf",
    rating: 4.6,
    description:
      "A mythological fiction that blends ancient Indian legends with action and philosophy. The book narrates the journey of Kalki as he prepares for his destined role in the age of chaos."
  },
  {
    id: 15,
    title: "Percy Jackson and the Last Olympian",
    category: "Fantasy",
    price: 229,
    Max_Price: 420,
    image: "/image/Percy Jackson and The Last Olympian.jpg",
    pdf: "/asset/Percy Jackson and The Last Olympian.pdf",
    rating: 4.7,
    description:
      "The final book of the Percy Jackson series where Percy faces his greatest challenge. Packed with Greek mythology, action, and adventure, this book concludes the epic saga."
  },
  {
    id: 16,
    title: "Shutter Island",
    category: "Thriller",
    price: 199,
    Max_Price: 380,
    image: "/image/Shutter Island.jpg",
    pdf: "/asset/Shutter Island.pdf",
    rating: 4.5,
    description:
      "A psychological thriller that follows two U.S. Marshals investigating a disappearance on a mysterious island. The story unfolds with shocking twists and intense suspense."
  },
  {
    id: 17,
    title: "The Day of the Jackal",
    category: "Thriller",
    price: 219,
    Max_Price: 400,
    image: "/image/The Day of the Jackal.jpg",
    pdf: "/asset/The Day of the Jackal.pdf",
    rating: 4.4,
    description:
      "A classic political thriller revolving around a professional assassin hired to kill the French president. Known for its realistic detail and tension-filled storytelling."
  }
]

export default BookData
