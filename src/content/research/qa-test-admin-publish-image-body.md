---
title: "QA Test: Admin Publish with Image in Body"
date: 2026-04-29
author: "Crestmore Research Team"
category: "Commodities"
tags: []
description: "QA verification test confirming the admin CMS can publish articles with embedded images in the article body."
---

## Executive Summary

This is a QA verification test confirming the Crestmore Research admin CMS can publish articles with embedded images in the article body.

## Test Scenario

The admin panel has been updated with:
- **ghFetch**: Timeout-aware GitHub API calls (20s AbortController)
- **insertImageToEditor**: Inserts uploaded image markdown at cursor position

## Image in Body

The following image was uploaded via the Additional Images section and inserted using the "+ Insert into editor" button:

![QA Test Image — Crestmore Research Analysis](/images/posts/qa-test-admin-publish-image-body/body-image-1.jpg)

## Conclusion

If this article publishes successfully, the admin CMS publish pipeline works end-to-end with images in the article body.

**Status:** ✅ Operational