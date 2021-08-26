import Image from "next/image";
import classes from "./Hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/kairu.jpg"
          alt="Kairu"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Kairu</h1>
      <p>Car lover and spotter</p>
    </section>
  );
}

export default Hero;
