import React from 'react';
import DevTerminal from '../components/dev/DevTerminal';
import StackBento from '../components/dev/StackBento';
import DevRoadmap from '../components/dev/DevRoadmap';
import ProjectShowcase from '../components/dev/ProjectShowcase';

export const wingCatalog = {
  dev: {
    badge: 'WING 02 // DEV_CORE',
    title: ['CRAFTING', 'MODERN SYSTEMS.'],
    lead: 'We design, build, and deploy production-grade web platforms, scalable backend services, and interactive digital experiences.',
    primaryAction: {
      label: 'EXPLORE BUILDS',
      href: '#projects'
    },
    secondaryAction: {
      label: 'LEARNING TRACKS',
      href: '#roadmap'
    },
    terminal: React.createElement(DevTerminal),
    stack: {
      dark: true,
      eyebrow: '01 / ECOSYSTEM',
      title: 'PRODUCTION TECH STACK.',
      subtitle: 'Modern frameworks and infrastructure we build with on a daily basis.',
      component: React.createElement(StackBento)
    },
    roadmap: {
      dark: false,
      eyebrow: '02 / CURRICULUM',
      title: 'STRUCTURED LEARNING TRACKS.',
      subtitle: 'From fundamental JavaScript and architecture to full-stack microservices and deployment.',
      component: React.createElement(DevRoadmap)
    },
    projects: {
      dark: true,
      eyebrow: '03 / BUILDS',
      title: 'SHIPPED PROJECTS & OPEN SOURCE.',
      component: React.createElement(ProjectShowcase)
    },
    cta: {
      eyebrow: 'CONTRIBUTE & BUILD',
      title: 'HAVE AN IDEA OR WANT TO CODE WITH US?',
      text: 'Join weekly code sprints, collaborate on repositories, and ship real products.',
      to: '/about',
      buttonLabel: 'JOIN US'
    }
  },

  design: {
    badge: 'WING 01 // DESIGN_CORE',
    title: ['SHAPING', 'BETTER EXPERIENCES.'],
    lead: 'We craft clean interfaces, structured systems, and memorable interactions that help brands stand out.',
    primaryAction: {
      label: 'VIEW CASES',
      href: '#projects'
    },
    secondaryAction: {
      label: 'PROCESS',
      href: '#roadmap'
    },
    terminal: React.createElement(StackBento),
    stack: {
      dark: true,
      eyebrow: '01 / SYSTEMS',
      title: 'DESIGN SYSTEMS.',
      subtitle: 'Modern UX patterns, design thinking, and reusable components.',
      component: React.createElement(StackBento)
    },
    roadmap: {
      dark: false,
      eyebrow: '02 / PROCESS',
      title: 'DESIGN LEARNING TRACKS.',
      subtitle: 'From interface fundamentals to prototyping, usability, and visual systems.',
      component: React.createElement(DevRoadmap)
    },
    projects: {
      dark: true,
      eyebrow: '03 / WORK',
      title: 'DESIGNED EXPERIENCES.',
      component: React.createElement(ProjectShowcase)
    },
    cta: {
      eyebrow: 'COLLABORATE',
      title: 'HAVE A PRODUCT IDEA TO SHAPE?',
      text: 'Let’s build interfaces that are clear, elegant, and conversion-ready.',
      to: '/about',
      buttonLabel: 'LET’S TALK'
    }
  },

  ai: {
    badge: 'WING 03 // AI_CORE',
    title: ['BUILDING', 'INTELLIGENT SYSTEMS.'],
    lead: 'We explore AI workflows, automation, model integrations, and application experiences that feel truly intelligent.',
    primaryAction: {
      label: 'VIEW USE CASES',
      href: '#projects'
    },
    secondaryAction: {
      label: 'LEARN PATH',
      href: '#roadmap'
    },
    terminal: React.createElement(DevTerminal),
    stack: {
      dark: true,
      eyebrow: '01 / STACK',
      title: 'AI TECH STACK.',
      subtitle: 'Prototyping, fine-tuning, pipelines, deployment, and experimentation.',
      component: React.createElement(StackBento)
    },
    roadmap: {
      dark: false,
      eyebrow: '02 / LEARNING',
      title: 'AI TRACKS.',
      subtitle: 'From fundamentals to workflow automation and practical AI products.',
      component: React.createElement(DevRoadmap)
    },
    projects: {
      dark: true,
      eyebrow: '03 / BUILDS',
      title: 'AI PROJECTS & EXPERIMENTS.',
      component: React.createElement(ProjectShowcase)
    },
    cta: {
      eyebrow: 'WORK WITH AI',
      title: 'WANT TO BUILD THE NEXT AI PRODUCT?',
      text: 'We help teams prototype, test, and ship measurable AI experiences.',
      to: '/about',
      buttonLabel: 'START NOW'
    }
  },

  dsa: {
    badge: 'WING 03 // DSA_CORE',
    title: ['MASTERING', 'ALGORITHMS & LOGIC.'],
    lead: 'We build problem-solving habits through structured practice, competitive programming, and analysis of core data structures and algorithms.',
    primaryAction: {
      label: 'VIEW TRACKS',
      href: '#projects'
    },
    secondaryAction: {
      label: 'LEARN PATH',
      href: '#roadmap'
    },
    terminal: React.createElement(DevTerminal),
    stack: {
      dark: true,
      eyebrow: '01 / FOUNDATION',
      title: 'DSA FOUNDATION.',
      subtitle: 'Arrays, graphs, trees, hashing, dynamic programming, and optimization techniques.',
      component: React.createElement(StackBento)
    },
    roadmap: {
      dark: false,
      eyebrow: '02 / CURRICULUM',
      title: 'PROBLEM-SOLVING TRACKS.',
      subtitle: 'From basics to advanced contests, interview prep, and real-world algorithmic thinking.',
      component: React.createElement(DevRoadmap)
    },
    projects: {
      dark: true,
      eyebrow: '03 / PRACTICE',
      title: 'DSA CHALLENGES & SOLUTIONS.',
      component: React.createElement(ProjectShowcase)
    },
    cta: {
      eyebrow: 'PRACTICE DAILY',
      title: 'READY TO LEVEL UP YOUR PROBLEM-SOLVING?',
      text: 'Join coding drills, discussion sessions, and challenge-based learning with the community.',
      to: '/about',
      buttonLabel: 'JOIN THE CHALLENGE'
    }
  },

  robotics: {
    badge: 'WING 04 // ROBOTICS_CORE',
    title: ['BUILDING', 'SMART MACHINES.'],
    lead: 'We explore robotics through sensors, control systems, embedded thinking, and hands-on prototyping of intelligent physical systems.',
    primaryAction: {
      label: 'VIEW PROJECTS',
      href: '#projects'
    },
    secondaryAction: {
      label: 'LEARN PATH',
      href: '#roadmap'
    },
    terminal: React.createElement(DevTerminal),
    stack: {
      dark: true,
      eyebrow: '01 / STACK',
      title: 'ROBOTICS TOOLCHAIN.',
      subtitle: 'Embedded systems, controls, perception, electronics, and experimental prototyping.',
      component: React.createElement(StackBento)
    },
    roadmap: {
      dark: false,
      eyebrow: '02 / LEARNING',
      title: 'ROBOTICS TRACKS.',
      subtitle: 'From fundamentals to automation, integration, and prototype development.',
      component: React.createElement(DevRoadmap)
    },
    projects: {
      dark: true,
      eyebrow: '03 / BUILDS',
      title: 'ROBOTICS PROJECTS.',
      component: React.createElement(ProjectShowcase)
    },
    cta: {
      eyebrow: 'MAKE IT MOVE',
      title: 'WANT TO BUILD A ROBOTIC IDEA?',
      text: 'Collaborate on sensor-driven systems, team builds, and rapid experimentation.',
      to: '/about',
      buttonLabel: 'JOIN THE LAB'
    }
  }
};