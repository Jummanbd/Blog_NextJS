import styles from './page.module.css';

export const metadata = {
    title: "Lama Dev Contact Information",
    description: "This is Contact Page",
  };
const Layout = ({children}) => {
  return (
    <div>
      <h1 className={styles.mainTitle}>Our Works</h1>
      {children}
    </div>
  )
}

export default Layout;