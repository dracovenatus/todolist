import Button from "@mui/material/Button"
import s from "./Page404.module.css"
import { Main } from "app/Main"
import { Link, NavLink } from "react-router"
import { Path } from "common/routing"

export const Page404 = () => {
  return (
    <>
      <h1 className={s.title}>404</h1>
      <h2 className={s.subTitle}>page not found</h2>
      <Button variant={"contained"} component={Link} to={Path.Main}>
        НА ГЛАВНУЮ СТРАНИЦУ
      </Button>
    </>
  )
}
