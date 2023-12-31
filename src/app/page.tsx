"use client";
import { getData } from "@/services/firebaseService";
import { useEffect, useState } from "react";
import "./style.css";
import { Grid, Popover, Typography } from "@mui/material";
export default function Home() {
  const [skills, setSkills] = useState<any[]>([]);

  const section = [
    { label: "Inicio", id: "start" },
    { label: "Sobre Mim", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Contatos", id: "contacts" },
  ];

  const contacts = [
    {
      type: "E-mail",
      value: "yuri.scavalcante@outlook.com",
      icon: "bi bi-envelope",
      url: "",
    },
    { type: "Telefone", value: "(91)99203-3562", icon: "bi bi-phone", url: "" },
    {
      type: "Linkedin",
      value: "www.linkedin.com/in/yuri-da-silva-cavalcante",
      icon: "bi bi-linkedin",
      url: "https://www.linkedin.com/in/yuri-da-silva-cavalcante",
    },
    {
      type: "GitHub",
      value: "github.com/yuriscavalcante",
      icon: "bi bi-github",
      url: "https://github.com/yuriscavalcante",
    },
  ];

  useEffect(() => {
    handleData();
  }, []);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [popOverData, setPopOverData] = useState<any>(null);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    data: any
  ) => {
    setPopOverData(data);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopOverData(null);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleData = async () => {
    const isData = await getData();
    const arr: any[] = [];
    if (isData.result && skills.length <= 0) {
      isData.result.forEach((doc: any) => {
        arr.push(doc.data());
      });
    }
    setSkills(arr);
  };

  return (
    <>
      <div className="container">
        <nav className="header">
          {section.map((sc: any) => {
            return (
              <div key={sc.label} className="selected">
                <a href={"#" + sc.id}>{sc.label + "/>"}</a>
              </div>
            );
          })}
        </nav>
        <div className="body">
          <div>
            <div className="line"></div>
            <div id="start" className="text">
              <label>{"Inicio/>"}</label>
              <h1>Olá, me chamo Yuri Cavalcante</h1>
              <h2>Desenvolvedor full-stack</h2>
            </div>
            <div id="about" className="text">
              <label>{"Sobre Mim/>"}</label>
              <p>
                Meu nome é Yuri da Silva Cavalcante, tenho 23 anos, formado em
                ciência da computação pela Faculdade Pan Amazônica, e estudande
                de pós graduação MBA em Cybersecurity e cybercrimes. Sempre fui
                apaixonado pela area de desenvolvimento de software. Busco
                sempre estar informado e atualizado em relação as novas
                tecnologias e aprender nunca é demais.
              </p>
            </div>
            <div id="skills" className="text">
              <label>{"Skills/>"}</label>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                {skills.map((sk: any) => {
                  return (
                    <Grid key={sk.value} item xs={2}>
                      <div
                        className="card"
                        aria-owns={open ? "mouse-over-popover" : undefined}
                        aria-haspopup="true"
                        onMouseEnter={(e) => {
                          handlePopoverOpen(
                            e,
                            sk.description ? sk.description : sk.value
                          );
                        }}
                        onMouseLeave={handlePopoverClose}
                      >
                        <img className="img" src={sk.url} alt="img" />
                        <label>{sk.value}</label>
                        <Popover
                          id="mouse-over-popover"
                          sx={{
                            pointerEvents: "none",
                          }}
                          open={open}
                          anchorEl={anchorEl}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          onClose={handlePopoverClose}
                          disableRestoreFocus
                        >
                          <div className="inner-popover">
                          <Typography sx={{ p: 1 }}>{popOverData}</Typography>
                          </div>
                        </Popover>
                      </div>
                    </Grid>
                  );
                })}
              </Grid>
            </div>
            <div id="contacts" className="text">
              <label>{"Contatos/>"}</label>
              {contacts.map((ct: any) => {
                return (
                  <div key={ct.type} className="contacts">
                    <i className={ct.icon}></i>
                    {ct.type}:{" "}
                    {ct.url ? (
                      <a className="link" href="{{ ct.url }}" target="_blank">
                        {ct.value}
                      </a>
                    ) : (
                      <a target="_blank">{ct.value}</a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
