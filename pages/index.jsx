import Head from "next/head";
import Image from "next/image";
// import { useRouter } from "next/navigation";//has a refresh method
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const blueRef = useRef(0);
  const redRef = useRef(1);
  const compoundRef = useRef(2);
  const [getCmp1, setCmp1] = useState();
  const [getCmp2, setCmp2] = useState();
  const refresh = useRouter();
  const elementCoordinates = [];
  let chemicalsContainer = [];
  const chemicalList = [
    { color: "bg-blue-500", chemical: "bb" },
    { color: "bg-yellow-400", chemical: "yy" },
    { color: "bg-red-600", chemical: "rr" },
    { color: "bg-orange-500", chemical: "oo" },
  ];
  const animateFormula = () => {
    elementCoordinates[0].target.style.position = "absolute";
    elementCoordinates[0].target.style.left = `${elementCoordinates[0].target.offsetLeft}px`;
    elementCoordinates[0].target.style.top = `${elementCoordinates[0].target.offsetTop}px`;
    elementCoordinates[0].target.style.bottom = `0`;
    elementCoordinates[1].target.style.transition = "all  ease-in 0.3s";
    elementCoordinates[0].target.style.transition = "all  ease-in 0.3s";
    refresh.replace(refresh.asPath);
    const animateTime = setTimeout(() => {
      elementCoordinates[0].target.style.height = `${elementCoordinates[1].target.offsetHeight}px`;
      elementCoordinates[0].target.style.left = `${
        elementCoordinates[1].target.offsetLeft - 100
      }px`;
      elementCoordinates[0].target.style.top = `-${
        elementCoordinates[1].target.offsetTop + 100
      }px`;
      elementCoordinates[0].target.style.transform = "rotate(90deg)";
      clearTimeout(animateTime);
    }, 100);
    setTimeout(() => {
      elementCoordinates[0].target.style.left = `${elementCoordinates[0].left}px`;
      elementCoordinates[0].target.style.top = `-${elementCoordinates[0].top}px`;
      elementCoordinates[0].target.style.transform = "rotate(0)";
      if (
        (chemicalsContainer[0] === "bb" && chemicalsContainer[1] === "rr") ||
        (chemicalsContainer[0] === "rr" && chemicalsContainer[1] === "bb")
      ) {
        elementCoordinates[1].target.classList =
          "formula-shape w-14 bg-green-500";
      } else if (
        (chemicalsContainer[0] === "yy" && chemicalsContainer[1] === "oo") ||
        (chemicalsContainer[0] === "oo" && chemicalsContainer[1] === "yy")
      ) {
        elementCoordinates[1].target.classList =
          "formula-shape w-14 bg-pink-500";
      }
    }, 500);
    setTimeout(
      () => (elementCoordinates[0].target.style.position = "static"),
      800
    );
  };
  const resetFormulaAnimation = () => {};
  const mixChemicals = (ch) => {
    chemicalsContainer.length === 2 && (() => (chemicalsContainer = []))();
    chemicalsContainer.push(ch);
    console.log(chemicalsContainer);
    chemicalsContainer.length === 2 && animateFormula();
  };
  useEffect(() => {
    console.log(`👉😍❤️ 😎👌 compoundRef`, compoundRef.current);
    return () => {};
  }, []);

  return (
    <div className="flex h-[100vh] flex-col">
      <Head>
        <title>Cloud Lab</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-1 justify-center">
        <div className="content-container flex flex-1 w-full max-w-md border-4 items-center">
          <div className="formulas-container flex h-40 gap-3 w-full justify-center relative border-2">
            {chemicalList.map((ch, id) => (
              <div className={`w-14 flex`} key={id}>
                <span
                  className={`formula-shape w-14 ${ch.color}`}
                  onClick={(e) => {
                    elementCoordinates.push({
                      top: e.currentTarget.offsetTop,
                      left: e.currentTarget.offsetLeft,
                      target: e.currentTarget,
                    });
                    console.log(elementCoordinates);
                    mixChemicals(ch.chemical);
                  }}
                ></span>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer className="">only footer</footer>
    </div>
  );
}
