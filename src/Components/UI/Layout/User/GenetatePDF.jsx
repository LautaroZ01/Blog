import PropTypes from "prop-types";
import { PDFDownloadLink } from '@react-pdf/renderer'
import { UserPDF } from '../../../Dashboard/PDF/UserPDF'

import { RiAiGenerate } from "react-icons/ri";
import useAuth from "../../../../Hooks/useAuth";

export const GenetatePDF = ({ post }) => {
    const { auth } = useAuth()

    return (
        auth && (
            <PDFDownloadLink
                document={<UserPDF post={post} />}
                fileName={`${post?.title}.pdf`}
            >
                {({ loading }) =>
                    loading ? (
                        <button>Loading Document ...</button>
                    ) : (
                        <button title="Generar PDF" className="text-primary-900 inline-flex p-2 bg-primary-100 rounded-md">
                            <RiAiGenerate />
                        </button>
                    )
                }
            </PDFDownloadLink>
        )
    )
}

GenetatePDF.propTypes = {
    post: PropTypes.object.isRequired
};