import { Box } from "@mui/material";
import discover from "../assets/discover.svg";
import Strategize from "../assets/strategize.svg";
import Build from "../assets/build.svg";
import Optimize from "../assets/optimize.svg";
import Operate from "../assets/Operate.svg"

export const steps = [
  {
    icon: <Box component="img" src={discover}  sx={{
          filter: "brightness(0) saturate(100%) invert(75%) sepia(45%) saturate(7441%) hue-rotate(349deg) brightness(97%) contrast(85%)"
        }}/>,
    title: "Discover",
    description: `Our discovery phase is where extraordinary events begin. We dive deep into understanding your unique requirements, vision, and goals to create personalized event experiences that exceed expectations.`,
    quote: `“Uncover Your Vision, Define Your Dream Even.”`,
  },
  {
    icon: <Box component="img" src={Strategize} sx={{
          filter: "brightness(0) saturate(100%) invert(75%) sepia(45%) saturate(7441%) hue-rotate(349deg) brightness(97%) contrast(85%)"
        }} />,
    title: "Strategize",
    description: `Strategic planning transforms your vision into an actionable roadmap. Our strategic planning phase combines creative innovation with operational excellence to design events that deliver measurable results and unforgettable experiences.`,
    quote: `"Craft the Perfect Blueprint for Event Success."`,
  },
  {
    icon: <Box component="img" src={Build} sx={{
          filter: "brightness(0) saturate(100%) invert(75%) sepia(45%) saturate(7441%) hue-rotate(349deg) brightness(97%) contrast(85%)"
        }}/>,
    title: "Build",
    description: `The build phase is where strategy meets action. Our dedicated project teams work tirelessly to construct every element of your event, from venue transformation to technology integration, ensuring flawless implementation of your vision.`,
    quote: `"Transform Ideas Into Reality Through Expert Execution."`,
  },
  {
    icon: <Box component="img" src={Operate} sx={{
          filter: "brightness(0) saturate(100%) invert(75%) sepia(45%) saturate(7441%) hue-rotate(349deg) brightness(97%) contrast(85%)"
        }}/>,
    title: "Operate",
    description: `Event day operations require precision, expertise, and unwavering attention to detail. Our operations team ensures smooth execution from setup to breakdown, managing every aspect of your event with military-like precision.`,
    quote: `"Deliver Flawless Events Through Professional Management."`,
  },
  {
    icon: <Box component="img" src={Optimize} sx={{
          filter: "brightness(0) saturate(100%) invert(75%) sepia(45%) saturate(7441%) hue-rotate(349deg) brightness(97%) contrast(85%)"
        }}/>,
    title: "Optimize",
    description: `Our operational approach combines traditional event management principles with cutting-edge technology, ensuring seamless coordination across all event elements. From wedding ceremonies to corporate conferences, we deliver consistent excellence that creates lasting memories.`,
    quote: `"Maximize Results Through Continuous Improvement."`,
  },
];
