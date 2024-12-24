import cache from "@/service/cache";
import { Link } from "expo-router";

export default function Logout () {

  const submit = async () => {
    cache.clearAll()
  }

  return (
    <Link href={"/login"} onPress={submit}>Logout</Link>
  )
}