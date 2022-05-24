import React from "react";
import Button from "@mui/material/Button";

import styles from "./Header.module.scss";
import Container from "@mui/material/Container";

export const Header = () => {
  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <a className={styles.logo} href="/">
            <div>ARCHAKOV BLOG</div>
          </a>
          <div className={styles.buttons}>
            <Button variant="outlined">Войти</Button>
            <Button variant="contained">Создать аккаунт</Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
