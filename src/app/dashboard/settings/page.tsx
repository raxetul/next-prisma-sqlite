
import {UserSettingsForm} from '@/components/user/user-settings-form';
import { getUser } from '@/db/user';
import { auth } from "@/auth";


export default async function Page() {

  const session = await auth();

  if (session?.user) {
    session.user = {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
    }; // filter out sensitive data
    return (

      <UserSettingsForm session={session}>
        
      </UserSettingsForm>
    
  );
  }
  throw new Error("No session");
  

  
}
