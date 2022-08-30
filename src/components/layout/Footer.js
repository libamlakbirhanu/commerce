import React from "react";
import { createStyles, Container, Text } from "@mantine/core";
import {
  IconSettings,
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandMessenger,
  IconBrandWhatsapp,
  IconReportMoney,
  IconCar,
  IconCreditCard,
  IconShieldCheck,
  IconUsers,
  IconBrandApple,
  IconBrandAndroid,
} from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  footerWrapper: {
    backgroundColor: "white",
    marginTop: "5rem",
  },
  footerTop: {
    display: "flex",
    textAlign: "center",
    paddingTop: "3rem",
    paddingBottom: "3rem",
  },
  topItem: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    padding: "0 .6rem",
    position: "relative",

    "&::after": {
      content: '""',
      position: "absolute",
      right: 0,
      top: "25%",
      height: "50%",
      width: "1px",
      backgroundColor: "rgba(0,0,0,0.1)",
    },

    "&:last-child::after": {
      content: "none",
    },
  },
  footerBottom: {
    display: "flex",
    paddingTop: "3rem",
    paddingBottom: "3rem",
    gap: "2rem",
  },
  bottomItem: {
    flex: 1,
  },
  brands: {
    display: "flex",
    gap: "1rem",
  },
}));

function Footer() {
  const { classes, theme } = useStyles();

  return (
    <div className={classes.footerWrapper}>
      <Container size="xl">
        <div className={classes.footerTop}>
          <div className={classes.topItem}>
            <IconReportMoney size={40} />
            <Text weight={700}>Top-Preis-Leistungs-Verhältnis</Text>
            <Text size="sm" color={theme.colors.gray[6]}>
              Wir bieten wettbewerbsfähige Preise für mehr als 100 Millionen
              Artikel.
            </Text>
          </div>
          <div className={classes.topItem}>
            <IconCar size={40} />
            <Text weight={700}>Weltweit einkaufen</Text>
            <Text size="sm" color={theme.colors.gray[6]}>
              Wir liefern in mehr als 200 Länder und Regionen und unsere Website
              ist in mehr als 12 Sprachen verfügbar.
            </Text>
          </div>
          <div className={classes.topItem}>
            <IconCreditCard size={40} />
            <Text weight={700}>Sichere Bezahlung</Text>
            <Text size="sm" color={theme.colors.gray[6]}>
              Bezahlen Sie mit den weltweit beliebtesten und sichersten
              Zahlungsmethoden.
            </Text>
          </div>
          <div className={classes.topItem}>
            <IconShieldCheck size={40} />
            <Text weight={700}>Sicher einkaufen</Text>
            <Text size="sm" color={theme.colors.gray[6]}>
              Unsere Käuferschutzrichtlinie deckt Ihren gesamten Einkauf ab.
            </Text>
          </div>
          <div className={classes.topItem}>
            <IconUsers size={40} />
            <Text weight={700}>Hilfecenter</Text>
            <Text size="sm" color={theme.colors.gray[6]}>
              Rund-um-die-Uhr-Unterstützung für einen reibungslosen Einkauf.
            </Text>
          </div>
          <div className={classes.topItem}>
            <div style={{ display: "flex" }}>
              <IconBrandApple size={40} />
              <IconBrandAndroid size={40} />
            </div>
            <Text weight={700}>Besser einkaufen</Text>
            <Text size="sm" color={theme.colors.gray[6]}>
              Laden Sie die App herunter und erhalten Sie reine Mobilfunktionen
              wie beispielsweise Bildersuche und Rabattspiele.
            </Text>
          </div>
        </div>
      </Container>
      <hr />
      <Container size="xl">
        <div className={classes.footerBottom}>
          <div className={classes.bottomItem}>
            <Text weight={700} mb="lg" size="lg">
              Stay connected
            </Text>
            <div className={classes.brands}>
              <IconBrandFacebook size="md" />
              <IconBrandTwitter size="md" />
              <IconBrandInstagram size="md" />
              <IconBrandMessenger size="md" />
              <IconBrandWhatsapp size="md" />
            </div>
          </div>
          <div className={classes.bottomItem}></div>
          <div className={classes.bottomItem}>
            <Text weight={700} mb="lg" size="lg">
              Shopping with us
            </Text>
            <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
              <li>
                <Text weight={300} size="sm">
                  Making payments
                </Text>
              </li>
              <li>
                <Text weight={300} size="sm">
                  Delivery options
                </Text>
              </li>
              <li>
                <Text weight={300} size="sm">
                  Buyer Protection
                </Text>
              </li>
            </ul>
          </div>
          <div className={classes.bottomItem}>
            <Text weight={700} mb="lg" size="lg">
              Customer service
            </Text>
            <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
              <li>
                <Text weight={300} size="sm">
                  Customer service
                </Text>
              </li>
              <li>
                <Text weight={300} size="sm">
                  Transaction Services Agreement
                </Text>
              </li>
              <li>
                <Text weight={300} size="sm">
                  Take our feedback survey
                </Text>
              </li>
            </ul>
          </div>
          <div className={classes.bottomItem}>
            <Text weight={700} mb="lg" size="lg">
              Collaborate with us
            </Text>
            <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
              <li>
                <Text weight={300} size="sm">
                  Partnerships
                </Text>
              </li>
              <li>
                <Text weight={300} size="sm">
                  Affiliate program
                </Text>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
