import classes from "./About.module.css";

const About = () => {
  return (
    <main className={classes.main}>
      <section className={classes.classifier_section}>
        <div>
          <p>
            Our proprietary U.S. HTS Classifier makes it easy to identify the
            correct 10-digits HTS code for your product. Simply enter a brief
            description (2 to 4 words), and the tool will guide you step by step
            to the exact classification, following U.S. Customs and Border
            Protection (CBP) standards. Unlike any other paid or free tool, our
            classifier adheres to CBP's official classification process,
            starting from the chapter and heading level down to the statistical
            suffix, ensuring accuracy and compliance for your import. Our U.S. HTS Classifier designed by Customs Brokers for Customs Brokers and the import commuinty.
          </p>
        </div>
      </section>
    </main>
  );
};

export default About;
