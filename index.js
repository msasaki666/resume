import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import fs from 'node:fs'

const technologies = new Set()
const technologyCollector = () => {
  /**
   * @param {import('mdast').Root} tree
   */
  let isTechnologyArea = false
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === 'heading') {
        if (node.children[0].value === '使用技術' && node.depth === 5) {
          isTechnologyArea = true
        } else {
          isTechnologyArea = false
        }
      }
      if (isTechnologyArea && node.type === 'listItem') {
        technologies.add(node.children[0].children[0].value)
      }
    })
  }
}
const technologyInserter = () => {
  // /**
  //  * @param {import('mdast').Root} tree
  //  */
  // let isTechnologyArea = false
  // return (tree) => {
  //   visit(tree, (node) => {
  //     if (node.type === 'heading') {
  //       if (node.children[0].value === '使用技術' && node.depth === 5) {
  //         isTechnologyArea = true
  //       } else {
  //         isTechnologyArea = false
  //       }
  //     }
  //     if (isTechnologyArea && node.type === 'listItem') {
  //       technologies.add(node.children[0].children[0].value)
  //     }
  //   })
  // }
}

const src = fs.readFileSync('resume.md', 'utf8')

const file = await unified()
  .use(remarkParse)
  .use(technologyCollector)
  .use(technologyInserter)
  .use(remarkStringify)
  .process(src)

// console.log(technologies)
