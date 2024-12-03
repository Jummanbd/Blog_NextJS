import { Suspense } from 'react';
import LoginPages from './logingpages';

const Login = () => {
  return (
    <Suspense>
      <LoginPages/>
    </Suspense>
  )
}

export default Login;
