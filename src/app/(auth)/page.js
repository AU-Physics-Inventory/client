'use client'

import Image from 'next/image'
import styles from './page.module.css'
import config from "../../resources/config.js"

export default function Login() {
    return (
        <main className={styles.main}>
            <style jsx global> {`
                * {
                  margin: 0;
                  -moz-box-sizing: border-box;
                  -webkit-box-sizing: border-box;
                  box-sizing: border-box;
                }
                
                *, *:before, *:after {
                  box-sizing: border-box;
                }
                
                body {
                    //background: var(--AU-BLUE);
                }
            `}</style>
            <div className={styles.navbar}>
                <Image className={styles.navbarLogo}
                       src={config.spaces.concat("/logos/B_Physics Inventory-04.png")}
                       alt="Physics Inventory"
                       width={100}
                       height={100}
                />
            </div>
            <div className={styles.loginDiv}>
                <div className={styles.logoDiv}>
                    <Image className={styles.logoImg}
                           src={config.spaces.concat("/logos/B_Physics Inventory-03.png")}
                           alt="Physics Inventory"
                           width={320}
                           height={320}
                    />
                </div>
                <div className={styles.loginForm}>
                    <div>
                        <h2>Login</h2>
                    </div>
                    <div>
                        <label htmlFor="usernameField">Username</label><br/>
                        <input type="text" name="usernameField"/><br/>
                    </div>
                    <div>
                        <label htmlFor="passwordField">Password</label><br/>
                        <input type="password" name="passwordField"/><br/>
                    </div>
                    <div>
                        <button>Login</button>
                        <p>or <a href="/register">Register</a></p>
                    </div>
                </div>
            </div>
        </main>
    );
}
