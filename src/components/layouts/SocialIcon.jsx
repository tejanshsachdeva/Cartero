// import React from "react";
import PropTypes from "prop-types";
import { ActionIcon } from "@mantine/core";

function SocialIcon({ link, ariaLabel = "Social Icon", children }) {
  return (
    <ActionIcon
      size="lg"
      color="gray"
      variant="subtle"
      radius="lg"
      component="a"
      target="_blank"
      href={link}
      aria-label={ariaLabel}
    >
      {children}
    </ActionIcon>
  );
}

SocialIcon.propTypes = {
  link: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default SocialIcon;
