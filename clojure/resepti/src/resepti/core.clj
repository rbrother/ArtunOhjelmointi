(ns resepti.core
  (:use hiccup.core))

(def reseptit
  #{ { :name "Lihapullat", :ainekset "", :työvaiheet "xyz", :kesto 20, :tekijat #{ "arttu" "saila" } },
    { :name "Uunilohi", :ainekset "", :työvaiheet "abc", :kesto 40, :tekijat #{ "saila" } },
    { :name "Maksalaatikko", :ainekset "", :työvaiheet "ccc", :kesto 50, :tekijat #{ "arttu" "saila" } } } )

(defn hae-resepti [ max-kesto ]
  (let [ alle-max-kesto (fn [res] (< (res :kesto) max-kesto)) ]
    (rand-nth (filter alle-max-kesto reseptit))))

(defn resepti-html [ resepti ]
  [ :html
   [ :body
    [ :h1 (resepti :name) ]
    [ :p "Ainesosat "]
    [ :p (resepti :työvaiheet) ]]] )

(defn paiva-rivi [paiva] { :paiva paiva } )

(defn viikko-rivit [viikko ]
  (concat [ {:viikko viikko} ] (map paiva-rivi (range 1 8)))  )

(defn kalenteri []
  [ :table
   (mapcat viikko-rivit (range 1 5) )
   ]
  )


;(println (html (resepti-html (hae-resepti 45))))

(println (kalenteri))
