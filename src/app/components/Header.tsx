

import { usePathname } from "next/navigation";
import Image from "next/image";
import { getCurrentUser } from "@/userAPI";


export default async function Header() {

  const current_user = await getCurrentUser();
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/">conduit</a>

        {!current_user ?
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <a className="nav-link active" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login">Sign in</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/register">Sign up</a>
            </li>
          </ul>
        :
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <a className="nav-link active" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/editor"> <i className="ion-compose"></i>&nbsp;New Article </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/settings"> <i className="ion-gear-a"></i>&nbsp;Settings </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/profile/eric-simons">
                <Image src="https://loremflickr.com/300/300" alt="" width={26} height={26} className="user-pic"></Image>
                {current_user.username}
              </a>
            </li>
          </ul>
        }
      </div>
    </nav>
  )
}