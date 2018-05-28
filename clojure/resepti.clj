(def reseptit
  #{ { :name "Lihapullat", :ainekset "", :työvaiheet "xyz", :kesto 20, :tekijat #{ "arttu" "saila" } },
    { :name "Uunilohi", :ainekset "", :työvaiheet "abc", :kesto 40, :tekijat #{ "saila" } },
    { :name "Maksalaatikko", :ainekset "", :työvaiheet "ccc", :kesto 50, :tekijat #{ "arttu" "saila" } } } )

(defn hae-resepti [ max-kesto ]
  (let [ alle-max-kesto (fn [res] (< (res :kesto) max-kesto)) ]
    (rand-nth (filter alle-max-kesto reseptit))))

(defn resepti-html [ resepti ]
  (str "<html><body>
       <h1>" (resepti :name) "</h1>
       <p>" (resepti :työvaiheet) "</p>
       </body></html>"))

(println (resepti-html (hae-resepti 45)))

(defn kalenteri []

  )
