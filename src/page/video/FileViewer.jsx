import {View, Text} from 'react-native'

const FileViewer = (props) => {
    const {path} = props;

    return (
        <View>
            <Text>{path}</Text>
        </View>
    )
}

export default FileViewer;