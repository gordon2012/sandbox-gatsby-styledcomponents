import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

const imagesQuery = graphql`
    query Images {
        allFile(
            filter: {
                extension: { regex: "/jpeg|jpg|gif|png/" }
                sourceInstanceName: { eq: "images" }
            }
        ) {
            edges {
                node {
                    name
                    childImageSharp {
                        fluid(maxWidth: 300) {
                          ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    }
`;

const Images = ({ children }) => (
    <StaticQuery query={imagesQuery}>
        {({ allFile: { edges } }) =>
            children(
                edges.reduce(
                    (allImages, edge) => ({
                        ...allImages,
                        [edge.node.name]: edge.node.childImageSharp,
                    }),
                    {}
                )
            )
        }
    </StaticQuery>
);

// TODO: Context? This will load all images for every image.
const Image = ({ src }) => (
    <Images>
        { images => (
            <Img fluid={images[src].fluid} />
        )}
    </Images>
);

export default Image;
