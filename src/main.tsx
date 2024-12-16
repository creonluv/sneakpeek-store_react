import { createRoot } from "react-dom/client";
import { Root } from "./root.tsx";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

createRoot(document.getElementById("root") as HTMLElement).render(<Root />);
