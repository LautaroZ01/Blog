import {
    Document,
    Text,
    Page,
    StyleSheet,
    View,
} from "@react-pdf/renderer";
import parse from 'html-react-parser';

import PropTypes from "prop-types";

export const UserPDF = ({ post }) => {
    const styles = StyleSheet.create({
        page: {
            padding: 20,
            fontSize: 12,
            fontFamily: 'Helvetica',
            color: '#333',
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 5,
        },
        subtitle: {
            fontSize: 14,
            color: '#666',
            marginBottom: 10,
        },
        image: {
            width: 100,
            height: 100,
            borderRadius: 50,
        },
        contentImage: {
            width: '100%',
            height: 200,
            marginVertical: 10,
            borderRadius: 5,
        },
        section: {
            marginVertical: 10,
        },
        text: {
            fontSize: 12,
            lineHeight: 1.5,
        },
        footer: {
            marginTop: 20,
            fontSize: 10,
            textAlign: 'center',
            color: '#888',
        }
    });

    const stripHtmlTags = (html) => (html || "").replace(/<\/?[^>]+(>|$)/g, "");

    const splitText = (text, length = 500) =>
        text.match(new RegExp(`.{1,${length}}`, "g")) || [];

    return (
        <Document>
            <Page style={styles.page}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>{post.title}</Text>
                        <Text style={styles.subtitle}>Publicado por {post.author} {post.surname}</Text>
                        <Text style={styles.subtitle}>Fecha: {new Date(post.created_at).toLocaleDateString()}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}>Estado: {post.state}</Text>
                    <Text style={styles.text}>Categoría: {post.category}</Text>
                </View>

                <View style={styles.section}>
                    {splitText(stripHtmlTags(post.content)).map((chunk, index) => (
                        <Text key={index} style={styles.text}>
                            {chunk}
                        </Text>
                    ))}
                </View>

                <Text style={styles.footer}>© Blog</Text>
            </Page>
        </Document>
    );
};

UserPDF.propTypes = {
    post: PropTypes.object.isRequired
};
