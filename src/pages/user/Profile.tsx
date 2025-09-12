import PasswordUpdateForm from "@/components/modules/User/Profile/PasswordUpdateForm";
import UserInfoUpdateForm from "@/components/modules/User/Profile/UserInfoUpdateForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Profile = () => {
    return (
        <div className="flex flex-col justify-start items-center min-h-[80vh]">
            <div className="w-full lg:w-[60%] mx-auto p-3 bg-primary/5 rounded-lg">
                <Tabs defaultValue="userInfo" className="w-full lg:w-[400px] mx-auto">
                    <TabsList className="flex flex-row justify-center items-center w-full">
                        <TabsTrigger value="userInfo">Update Personal Info</TabsTrigger>
                        <TabsTrigger value="password">Change Password</TabsTrigger>
                    </TabsList>
                    <TabsContent value="userInfo">
                        <UserInfoUpdateForm />
                    </TabsContent>
                    <TabsContent value="password">
                        <PasswordUpdateForm />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default Profile;