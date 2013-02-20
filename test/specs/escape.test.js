define(["escape"], function (escape) {
    module("Escape");

    test("Escape API", function () {
        expect(2);
        deepEqual(typeof escape.html, "function", "escape.html is a function");
        deepEqual(typeof escape.html(), "string", "escape.html() returns a string");
    });

    test("Escape HTML", function () {
        expect(4);
        var htmlStr1 = "<p>HTML Tag</p>",
            htmlStr2 = "<span>Foo & bar</span>",
            htmlStr3 = '" onmouseover="alert(\'derp\')" " "',
            htmlStr4 = '<a href="' + escape.html(htmlStr3) + '">Bob</a>';
        deepEqual(escape.html(htmlStr1), "&lt;p&gt;HTML Tag&lt;&#x2F;p&gt;", "Basic HTML string escaped properly");
        deepEqual(escape.html(htmlStr2), "&lt;span&gt;Foo &amp; bar&lt;&#x2F;span&gt;", "Basic HTML and & string escaped properly");
        deepEqual(escape.html(htmlStr3), "&quot; onmouseover=&quot;alert(&#x27;derp&#x27;)&quot; &quot; &quot;", "Escaping a bit more complex example");
        deepEqual(escape.html(htmlStr4), "&lt;a href=&quot;&amp;quot; onmouseover=&amp;quot;alert(&amp;#x27;derp&amp;#x27;)&amp;quot; &amp;quot; &amp;quot;&quot;&gt;Bob&lt;&#x2F;a&gt;", "Escaping an escaped string");
    })
});
