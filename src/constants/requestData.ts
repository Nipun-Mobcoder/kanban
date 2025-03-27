export type RequestItem = {
    img?: string;
    heading: string;
    tags: string[];
    likes?: number;
    comments: number;
    date?: string;
    assigned?: {
      user: string;
      avatar: string;
    };
    lines?: string[];
  };
  
  export type Requestdata = {
    [key: string]: RequestItem[];
  };

export const requestData = {
  "New Request": [
    {
      img: "/images/img1.svg",
      heading: "New user templates for a fintech app (High Priority)",
      tags: ["Started", "P2"],
      likes: 2,
      comments: 0,
      date: "Dec 2-8",
      assigned: {
        user: "Nipun",
        avatar: "/images/avatar1.svg",
      },
    },
    {
      heading: "Mobile App Wireframes",
      tags: ["Started", "P1"],
      likes: 0,
      comments: 0,
    },
    {
      heading: "New Pricing System Update",
      tags: ["Started", "P1"],
      likes: 0,
      comments: 0,
    },
  ],
  Assigned: [
    {
      heading: "Backend enhancements and performance improvements",
      tags: ["Ongoing"],
      likes: 7,
      comments: 0,
      date: "Dec 2-8",
      assigned: {
        user: "Lalit",
        avatar: "/images/avatar2.svg",
      },
    },
    {
      heading: "Customer Reporting",
      tags: ["Not Started"],
      likes: 2,
      comments: 88,
      date: "Dec 2-8",
      assigned: {
        user: "Anurag",
        avatar: "/images/avatar3.svg",
      },
      lines: ["#4F46E5", "#22C55E"],
    },
    {
      heading: "Offline Mode Functionality",
      tags: ["Started"],
      likes: 2,
      comments: 1,
      date: "Dec 2-8",
      assigned: {
        user: "Anurag",
        avatar: "/images/avatar4.svg",
      },
      lines: ["#F59E0B"],
    },

    {
      heading: "User Community Launch Enhancements",
      tags: ["Not Started"],
      comments: 11,
      date: "Dec 2-8",
      assigned: {
        user: "Anurag",
        avatar: "/images/avatar5.svg",
      },
      lines: ["#F59E0B"],
    },
  ],
  InProgress: [
    {
      heading: "Upgrade and payment options",
      tags: ["InProgress", "P2"],
      likes: 668,
      comments: 97,
      date: "Dec 2-8",
      assigned: {
        user: "Anurag",
        avatar: "/images/avatar3.svg",
      },
      lines: ["#22C55E", "#F59E0B", "#F43F5E"],
    },
    {
      img: "/images/img2.svg",
      heading: "In-product education",
      tags: ["Not Started"],
      likes: 2,
      comments: 0,
      date: "Dec 2-8",
      assigned: {
        user: "Nipun",
        avatar: "/images/avatar1.svg",
      },
    },
    {
      heading: "App design refresh",
      tags: ["InProgress", "P3"],
      likes: 88,
      comments: 34,
      date: "Dec 2-8",
      assigned: {
        user: "Anurag",
        avatar: "/images/avatar2.svg",
      },
      lines: ["#F43F5E"],
    },
    {
      img: "/images/img3.svg",
      heading: "Linux version update",
      tags: ["Not Started", "P1"],
      likes: 3,
      comments: 0,
      date: "Dec 2-8",
      assigned: {
        user: "Nipun",
        avatar: "/images/avatar4.svg",
      },
    },
  ],
  Approved: [],
};
