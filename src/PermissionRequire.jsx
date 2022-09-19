import { useEffect, useState } from "react"

const { Text } = require("@rneui/base")
const { View, PermissionsAndroid } = require("react-native")

const PermissionRequire = () => {
    const [permission, setPermission] = useState(false)

    const requestPermission = async () => {
        try {
            const permissions = [
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            ];

            const result = await PermissionsAndroid.requestMultiple(permissions)

            const allPermissionGranted = Object.values(result).every(
                result => result === PermissionsAndroid.RESULTS.GRANTED
            )

            if (allPermissionGranted) {
                console.log("permission granted")
            }
        } catch (err) {
            console.log('false')
        }
    }

    useEffect(() => {
        requestPermission
    }, [])

    return (
        <View className="flex justify-center items-center h-full">
            <Text>请求权限中</Text>
        </View>
    )
}

export default PermissionRequire;