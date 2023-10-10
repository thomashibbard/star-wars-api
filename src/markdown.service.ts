import { Injectable } from '@nestjs/common';
import * as markdownIt from 'markdown-it';
import hljs from 'highlight.js';

@Injectable()
export class MarkdownService {
  baseCss = `/*/*
  "GitHub Flavor", a GitHub flavored CSS style sheet for Markdown documents.
  Based on Chris Patuzzo's github.css (https://gist.github.com/tuzz/3331384).
  
  
  author: Fabrizio Musacchio (https://www.fabriziomusacchio.com)
  date: 03.01.2020
  
  
  License:
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.*/ .top-link,a.anchor{bottom:0;cursor:pointer}body,table tr{background-color:#fff}dl,dl dt,dl dt:first-child,pre code,table,table tr{padding:0}.top-link,h1,h2,mark{color:#000}body{font-family:Helvetica,arial,sans-serif;font-size:14px;line-height:1.4em;padding:10px 25px}body>:first-child{margin-top:0!important}body>:last-child{margin-bottom:0!important}@media screen and (prefers-reduced-motion:no-preference){html{scroll-behavior:smooth}}a{color:#3973ad;text-decoration:none}a:hover{color:#4183c4}a.absent{color:#c00}a.anchor{display:block;padding-left:30px;margin-left:-30px;position:absolute;top:0;left:0}h1,h2,h3,h4,h5,h6{margin:20px 0 10px;padding:0;line-height:1.4em;font-weight:700;-webkit-font-smoothing:antialiased;cursor:text;position:relative}h1 code,h1 tt,h2 code,h2 tt,h3 code,h3 tt,h4 code,h4 tt,h5 code,h5 tt,h6 code,h6 tt{font-size:inherit}h1{font-size:28px}h2{font-size:24px;border-bottom:1px solid #ccc}h3{font-size:18px}h4{font-size:16px}dl dt,h5,h6,table tr td,table tr th{font-size:14px}h6{color:#777}blockquote,dl,li,ol,p,pre,table,ul{margin:15px 0}a:first-child h1,a:first-child h2,a:first-child h3,a:first-child h4,a:first-child h5,a:first-child h6,body>h1:first-child,body>h1:first-child+h2,body>h2:first-child,body>h3:first-child,body>h4:first-child,body>h5:first-child,body>h6:first-child{margin-top:0;padding-top:0}blockquote>:first-child,dl dd>:first-child,dl dt>:first-child,h1 p,h2 p,h3 p,h4 p,h5 p,h6 p,table tr td :first-child,table tr th :first-child{margin-top:0}ol li,ul li{margin-top:.15em;margin-bottom:.15em}ul li li{margin-left:-15px}ol ol,ol ul,ul ol,ul ul{margin-top:0;margin-bottom:0}a[href^="#fn:"]:after{content:')';font-size:.83em;vertical-align:super;line-height:0}li:target{background-color:#e8fef6}.footnotes>ol>li>p{display:inline}.footnotes ol{list-style:none;counter-reset:footnotes;padding-left:15px}.footnotes ol li{counter-increment:footnotes}.footnotes ol li:before{font-weight:700;content:counters(footnotes, ".") ")"}.footnotes li{padding-bottom:.45em}.footnotes{background-color:#f4f5f8;padding:0 0 .25em}.TOC{background:#f4f5f8;border-radius:10px;display:table;font-size:95%;margin-bottom:1em;padding:2px;width:100%}.top-link,code,table tr:nth-child(2n),tt{background-color:#f8f8f8}.TOC li,.TOC ul,.TOC ul li{list-style:decimal}.top-link{transition:.25s ease-in-out;position:fixed;right:0;display:inline-flex;align-items:center;justify-content:center;margin:0 2em 2em 0;border-radius:50%;padding:.25em;width:1em;height:1em}dl dt{font-weight:700;font-style:italic;margin:15px 0 5px}blockquote>:last-child,dl dd>:last-child,dl dt>:last-child,table tr td :last-child,table tr th :last-child{margin-bottom:0}dl dd{margin:0 0 15px;padding:0 15px}blockquote{border-left:4px solid #ddd;padding:0 15px;font-style:normal;color:#5598c1}table{border-collapse:collapse;margin-left:auto;margin-right:auto;text-align:center}table tr{margin:0}table tr th{font-weight:700;background-color:#eefbff;margin:0;padding:.4em .35em}table tr td{margin:0;padding:5px}img{max-width:100%}span.frame{display:block;overflow:hidden}span.frame>span{border:1px solid #ddd;display:block;float:left;overflow:hidden;margin:13px 0 0;padding:7px;width:auto}span.frame span img{display:block;float:left}span.frame span span{clear:both;color:#333;display:block;padding:5px 0 0}span.align-center,span.align-right{display:block;overflow:hidden;clear:both}span.align-center>span{display:block;overflow:hidden;margin:13px auto 0;text-align:center}span.align-center span img{margin:0 auto;text-align:center}span.align-right>span{display:block;overflow:hidden;margin:13px 0 0;text-align:right}span.align-right span img{margin:0;text-align:right}span.float-left{display:block;margin-right:13px;overflow:hidden;float:left}span.float-left span{margin:13px 0 0}span.float-right{display:block;margin-left:13px;overflow:hidden;float:right}span.float-right>span{display:block;overflow:hidden;margin:13px auto 0;text-align:right}code,tt{margin:0 2px;padding:0 5px;white-space:nowrap;border:1px solid #eaeaea;border-radius:3px}.highlight pre,pre{background-color:#f8f8f8;border:1px solid #ccc;padding:6px 10px}pre code{margin:0;white-space:pre;background:0 0}.highlight pre{font-size:13px;line-height:19px;overflow:auto;border-radius:3px}pre{font-size:.9em!important;line-height:1.6em!important;border-radius:3px}sub,sup{font-size:.83em;line-height:0}pre code,pre tt{background-color:transparent;border:none}sup{vertical-align:super}sub{vertical-align:sub}kbd{display:inline-block;padding:3px 5px;font-size:11px;line-height:10px;color:#555;vertical-align:middle;background-color:#fcfcfc;border:1px solid #ccc;border-bottom-color:#bbb;border-radius:3px;box-shadow:inset 0 -1px 0 #bbb}mark{background-color:#fdfdcc}*{-webkit-print-color-adjust:exact}@media screen and (min-width:914px){body{width:854px;margin:0 auto}}@media print{pre,table{page-break-inside:avoid}pre{word-wrap:break-word}body{padding:2cm}}`;
  syntaxCss = `BSD 3-Clause License

  Copyright (c) 2006, Ivan Sagalaev.
  All rights reserved.
  
  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:
  
  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.
  
  * Neither the name of the copyright holder nor the names of its
    contributors may be used to endorse or promote products derived from
    this software without specific prior written permission.
  
  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
  DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
  FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
  DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
  SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
  CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
  OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
  OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{color:#24292e;background:#fff}.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_{color:#d73a49}.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:#6f42c1}.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable{color:#005cc5}.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#032f62}.hljs-built_in,.hljs-symbol{color:#e36209}.hljs-code,.hljs-comment,.hljs-formula{color:#6a737d}.hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag{color:#22863a}.hljs-subst{color:#24292e}.hljs-section{color:#005cc5;font-weight:700}.hljs-bullet{color:#735c0f}.hljs-emphasis{color:#24292e;font-style:italic}.hljs-strong{color:#24292e;font-weight:700}.hljs-addition{color:#22863a;background-color:#f0fff4}.hljs-deletion{color:#b31d28;background-color:#ffeef0}`;
  parser: markdownIt;
  constructor() {
    this.parser = markdownIt({
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(str, { language: lang }).value;
          } catch (__) {}
        }

        return ''; // use external default escaping
      },
    });
  }
  render(md: string) {
    const html = this.parser.render(md);
    const baseStyleTag = this.wrapWithStyleTag(this.baseCss);
    const syntaxStyleTag = this.wrapWithStyleTag(this.syntaxCss);
    return `${html} ${baseStyleTag} ${syntaxStyleTag}`;
  }
  wrapWithStyleTag(css: string) {
    return `<style type="text/css">${css}</style>`;
  }
}
