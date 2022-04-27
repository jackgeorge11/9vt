import { graphql, Link } from "gatsby";
import React from "react";
import Layout from "../components/Layout";
import Window from "../components/Window";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";

export const query = graphql`
  query ($slug: String!) {
    allContentfulOpenCall(filter: { slug: { eq: $slug } }) {
      nodes {
        slug
        description {
          raw
        }
      }
    }
  }
`;

const Bold = ({ children }) => <span className="bold">{children}</span>;
const Text = ({ children }) => <p className="align-center">{children}</p>;

const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      return (
        <>
          <h2>Embedded Asset</h2>
          <pre>
            <code>{JSON.stringify(node, null, 2)}</code>
          </pre>
        </>
      );
    },
  },
};

export default function OpenCall({ data }) {
  const call = data?.allContentfulOpenCall.nodes[0];

  return (
    <Layout page="submissions">
      <Window className="small">
        {call.description && renderRichText(call.description, options)}
        <h2>
          submit your work or any questions you might have to{" "}
          <a href="mailto:submissions@9vtbackslash5.com">
            submissions@9vtbackslash5.com
          </a>.
        </h2>
        <h2 className="ta-right"><Link to="/submissions">click here</Link> to navigate back to our submissions page.</h2>
      </Window>
    </Layout>
  );
}
